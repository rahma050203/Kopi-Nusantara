<?php
echo "perulangan (foreach) untuk array asosiatif (assosiative array)\n";

//data
$kopi_a=["nama" => "kopi toraja", "harga" => 85000];
//logika
foreach ($kopi_a as $kunci => $nilai) {
    echo "$kunci: $nilai\n";
}