export default function formatcurrency(num){

    return '$' + Number(num.toFixed(1)).toLocaleString() + " ";
}