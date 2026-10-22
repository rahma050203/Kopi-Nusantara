<?php

$produk = [
    ["slug" => "kopi-nusantara",    "nama"=> "Kopi Nusantara",  "harga"=> 45000],
    ["slug" => "teh-melati",        "nama"=> "Teh Melati",      "harga"=> 25000],
    ["slug" => "cokelat-aceh",      "nama"=> "Cokelat-Aceh",    "harga"=> 3000 ],
];

header('Content-Type: application/json; charset=utf-8');

echo json_encode($produk, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);