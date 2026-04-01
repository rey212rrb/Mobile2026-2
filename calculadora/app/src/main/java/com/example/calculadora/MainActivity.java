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
        }else if (id == R.id.btnPercentage) {
            if (!currentInput.isEmpty()) {
                double valor = Double.parseDouble(currentInput);
                double resultado = valor / 100;
                currentInput = String.valueOf(resultado);
                txvResult.setText(currentInput);
            }
        }else if (id == R.id.btnPlusMinus) {
            if (!currentInput.isEmpty() && !currentInput.equals("0")) {
                double valor = Double.parseDouble(currentInput);
                double resultado = valor * -1; // Invertimos el signo
                currentInput = String.valueOf(resultado);
                txvResult.setText(currentInput);
            }
        } else if (id == R.id.btnEqual) {

            String operacionCompleta = txvResult.getText().toString();
            txvOperation.setText(operacionCompleta + "=");

            try {
                double n1, n2;
                Operacion op = null;

                if (operacionCompleta.contains("X")) {
                    String[] partes = operacionCompleta.split("X");
                    op = new Operacion(Double.parseDouble(partes[0]), Double.parseDouble(partes[1]), OperationType.MULTIP);
                }
                else if (operacionCompleta.contains("+")) {
                    String[] partes = operacionCompleta.split("\\+");
                    op = new Operacion(Double.parseDouble(partes[0]), Double.parseDouble(partes[1]), OperationType.ADD);
                }
                else if (operacionCompleta.contains("-")) {
                    String[] partes = operacionCompleta.split("-");
                    op = new Operacion(Double.parseDouble(partes[0]), Double.parseDouble(partes[1]), OperationType.SUBSTRAC);
                }
                else if (operacionCompleta.contains("/")) {
                    String[] partes = operacionCompleta.split("/");
                    op = new Operacion(Double.parseDouble(partes[0]), Double.parseDouble(partes[1]), OperationType.DIV);
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
        }
        else {
            Button b = (Button) v;
            String buttonText = b.getText().toString();

            if (currentInput.equals("0")) currentInput = buttonText;
            else currentInput += buttonText;

            txvResult.setText(currentInput);
        }
    }
}