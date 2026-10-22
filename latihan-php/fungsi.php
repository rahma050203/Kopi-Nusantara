<?php

function formatRupiah(int $angka): string
{
    return "Rp " . number_format($angka, 0, ",", ".");
}

echo formatRupiah(45000) . "\n";    //Rp 45.000
echo formatRupiah(125000) . "\n";   //Rp 1.250.000