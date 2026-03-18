package com.example.calculadoratarea;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.calculadoratarea.enums.Operacion;
import com.example.calculadoratarea.implementaciones.CalcularImp;
import com.example.calculadoratarea.interfaces.ICalculadora;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    EditText n1, n2;
    double primerNumero = 0;
    Operacion opPendiente = null;

    boolean esNuevoNumero = true;
    TextView res;

    //Button suma, resta, mult, div;

    ICalculadora calculadora = new CalcularImp();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        n1 = findViewById(R.id.etNumero1);
        //n2 = findViewById(R.id.etNumero2);
        res = findViewById(R.id.txvResutado);

        findViewById(R.id.btnSuma).setOnClickListener(this);
        findViewById(R.id.btnResta).setOnClickListener(this);
        findViewById(R.id.btnMult).setOnClickListener(this);
        findViewById(R.id.btnDiv).setOnClickListener(this);

        findViewById(R.id.btn0).setOnClickListener(this);
        findViewById(R.id.btn1).setOnClickListener(this);
        findViewById(R.id.btn2).setOnClickListener(this);
        findViewById(R.id.btn3).setOnClickListener(this);
        findViewById(R.id.btn4).setOnClickListener(this);
        findViewById(R.id.btn5).setOnClickListener(this);
        findViewById(R.id.btn6).setOnClickListener(this);
        findViewById(R.id.btn7).setOnClickListener(this);
        findViewById(R.id.btn8).setOnClickListener(this);
        findViewById(R.id.btn9).setOnClickListener(this);


        findViewById(R.id.btnLimpiar).setOnClickListener(this);
        findViewById(R.id.btnIgual).setOnClickListener(this);


    }


    @Override
    public void onClick(View v) {
        int id = v.getId();


        if (id == R.id.btn0 || id == R.id.btn1 || id == R.id.btn2 || id == R.id.btn3 ||
                id == R.id.btn4 || id == R.id.btn5 || id == R.id.btn6 || id == R.id.btn7 ||
                id == R.id.btn8 || id == R.id.btn9) {

            Button botonPulsado = (Button) v;
            String numero = botonPulsado.getText().toString();

            if (esNuevoNumero) {
                n1.setText(numero);
                esNuevoNumero = false;
            } else {
                n1.append(numero);
            }
            return;
        }


        if (id == R.id.btnSuma || id == R.id.btnResta || id == R.id.btnMult || id == R.id.btnDiv) {

            primerNumero = Double.parseDouble(n1.getText().toString());

            if (id == R.id.btnSuma) opPendiente = Operacion.SUMA;
            if (id == R.id.btnResta) opPendiente = Operacion.RESTA;
            if (id == R.id.btnMult) opPendiente = Operacion.MULTIPLICACION;
            if (id == R.id.btnDiv) opPendiente = Operacion.DIVISION;

            esNuevoNumero = true;
            return;
        }


        if (id == R.id.btnIgual) {

            double segundoNumero = Double.parseDouble(n1.getText().toString());


            double resultado = calculadora.calcular(primerNumero, segundoNumero, opPendiente);

            n1.setText(String.valueOf(resultado));
            esNuevoNumero = true;
            return;
        }

        if (id == R.id.btnLimpiar) {
            n1.setText("0");
            primerNumero = 0;
            opPendiente = null;
            esNuevoNumero = true;
        }
    }



}