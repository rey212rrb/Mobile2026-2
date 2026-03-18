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
    TextView res;

    //Button suma, resta, mult, div;

    ICalculadora calculadora = new CalcularImp();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        n1 = findViewById(R.id.etNumero1);
        n2 = findViewById(R.id.etNumero2);
        res = findViewById(R.id.txvResutado);

        findViewById(R.id.btnSuma).setOnClickListener(this);
        findViewById(R.id.btnResta).setOnClickListener(this);
        findViewById(R.id.btnMult).setOnClickListener(this);
        findViewById(R.id.btnDiv).setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {

        double valor1 = Double.parseDouble(n1.getText().toString());
        double valor2 = Double.parseDouble(n2.getText().toString());
        double resultado = 0;

        if(v.getId() == R.id.btnSuma) {
            resultado = calculadora.calcular(valor1, valor2, Operacion.SUMA);
        }

        if(v.getId() == R.id.btnResta){

            resultado = calculadora.calcular(valor1, valor2, Operacion.RESTA);

        }

        if(v.getId() == R.id.btnMult){

            resultado = calculadora.calcular(valor1, valor2, Operacion.MULTIPLICACION);

        }

        if(v.getId() == R.id.btnDiv){

            resultado = calculadora.calcular(valor1, valor2, Operacion.DIVISION);

        }

        res.setText("Resultado: " + resultado);

    }
}