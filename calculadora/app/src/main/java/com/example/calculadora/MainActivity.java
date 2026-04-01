package com.example.calculadora;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView txvOperation, txvResult;
    private String currentInput = "";

    ViewModel vm = new ViewModel();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txvOperation = findViewById(R.id.txvOperation);
        txvResult = findViewById(R.id.txvResult);

        txvOperation.setText("");
        txvResult.setText("0");
        currentInput = "";

        setClickListeners();
    }

    private void setClickListeners() {
        int[] ids = {
                R.id.btnCero, R.id.btnOne, R.id.btnSecond, R.id.btnThird,
                R.id.btnFour, R.id.btnFive, R.id.btnSix, R.id.btnSeven,
                R.id.btnEight, R.id.btnNine, R.id.btnPoint, R.id.btnPlus,
                R.id.btnMinus, R.id.btnMultiple, R.id.btnDivide, R.id.btnEqual,
                R.id.btnAc, R.id.btnPercentage, R.id.btnPlusMinus
        };

        for (int id : ids) {
            findViewById(id).setOnClickListener(this);
        }

        findViewById(R.id.btnDelete).setOnClickListener(this);
    }

    private double limpiarYParsear(String valor) {
        String limpio = valor.replace("(", "").replace(")", "");

        limpio = limpio.replace("--", "").replace("+-", "-");

        if (limpio.isEmpty() || limpio.equals("-")) return 0.0;

        return Double.parseDouble(limpio);
    }

    @Override
    public void onClick(View v) {
        int id = v.getId();

        if (id == R.id.btnAc) {
            currentInput = "";
            txvResult.setText("0");
            txvOperation.setText("");
        } else if (id == R.id.btnDelete) {
            if (currentInput.length() > 0) {
                currentInput = currentInput.substring(0, currentInput.length() - 1);
                txvResult.setText(currentInput.isEmpty() ? "0" : currentInput);
            }
        } else if (id == R.id.btnPercentage) {
            if (!currentInput.isEmpty()) {
                double valor = limpiarYParsear(currentInput);
                double resultado = valor / 100;
                currentInput = String.valueOf(resultado);
                txvResult.setText(currentInput);
            }
        } else if (id == R.id.btnPlusMinus) {
            if (!currentInput.isEmpty() && !currentInput.equals("0")) {
                if (currentInput.startsWith("(-") && currentInput.endsWith(")")) {
                    currentInput = currentInput.substring(2, currentInput.length() - 1);
                }
                else if (currentInput.startsWith("-")) {
                    currentInput = currentInput.substring(1);
                }
                else {
                    currentInput = "(-" + currentInput + ")";
                }
                txvResult.setText(currentInput);
            }
        } else if (id == R.id.btnEqual) {
            String operacionOriginal = txvResult.getText().toString();
            String operacionProcesada = operacionOriginal;

            try {

                operacionProcesada = operacionProcesada.replaceAll("(\\d)\\(", "$1X(");
                operacionProcesada = operacionProcesada.replaceAll("\\)(\\d)", ")X$1");
                operacionProcesada = operacionProcesada.replace(")(", ")X(");

                txvOperation.setText(operacionOriginal + "=");

                Operacion op = null;

                if (operacionProcesada.contains("X")) {
                    String[] partes = operacionProcesada.split("X");
                    op = new Operacion(limpiarYParsear(partes[0]), limpiarYParsear(partes[1]), OperationType.MULTIP);
                }
                else if (operacionProcesada.contains("+")) {
                    String[] partes = operacionProcesada.split("\\+");
                    op = new Operacion(limpiarYParsear(partes[0]), limpiarYParsear(partes[1]), OperationType.ADD);
                }
                else if (operacionProcesada.contains("-")) {
                    int lastIndex = operacionProcesada.lastIndexOf("-");
                    String p1 = operacionProcesada.substring(0, lastIndex);
                    String p2 = operacionProcesada.substring(lastIndex + 1);
                    op = new Operacion(limpiarYParsear(p1), limpiarYParsear(p2), OperationType.SUBSTRAC);
                }
                else if (operacionProcesada.contains("/")) {
                    String[] partes = operacionProcesada.split("/");
                    op = new Operacion(limpiarYParsear(partes[0]), limpiarYParsear(partes[1]), OperationType.DIV);
                }

                if (op != null) {
                    Double resultado = vm.makeOperation(op);
                    txvResult.setText(String.valueOf(resultado));
                    currentInput = String.valueOf(resultado);
                }

            } catch (Exception e) {
                txvResult.setText("Error");
                currentInput = "";
            }
        } else {
            Button b = (Button) v;
            String buttonText = b.getText().toString();

            if (currentInput.equals("0")) currentInput = buttonText;
            else currentInput += buttonText;

            txvResult.setText(currentInput);
        }
    }

}