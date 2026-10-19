//materi 5

/* MULAI
diketahui total  =150000
jika total >=200000, maka tampilkan "diskon 10%",
juka tidak, maka
lainnya
jika total >= 100000, maka tampilkan "diskon 5%"
jika tidak, maka
lainnya tampilkan "tidak ada diskon"
 */

const total = 150000;
if (total >= 20000) {
    console.log("Diskon 10%");
} 
    else if (total >=100000) {
    console.log("Tidak ada diskon");
}

//switch case

const kategori = "arabica";

switch (kategori) {
    case "arabika":
        console.log("Rasa lebih asam dan beraroma");
        console.log(` ${kategori} Rasa lebih asam dan beraroma`)
        break;
        case "robusta":
        console.log("Rasa lebih pahit dan kafein tinggi");
        break;
        default:
            console.log("Kategori tidak dikenal");
}