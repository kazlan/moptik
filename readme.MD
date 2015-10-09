to-do checklist
===============
x Metiendo mano a dataFactory.js, cambiar referencias de Firebase a $meteor.

o Al leer los datos con el esquema de meteor no junta las distintas marcas de un mismo cliente
  Hay que volver a poner la lógica que había antes de si existe ya cliente añadir campos nuevos
  y tal.

o También sería aconsejable modularizar el clima. Igual lo podemos pedir desde client
  al listar. Es algo tan variable que no tiene mucho sentido guardarlo en la DB.
  Rollo...  Display clima -> if no clima fetch de yahoo, pero algo in memory