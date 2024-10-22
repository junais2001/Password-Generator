export function getRandomChar (min,max){
    const limit =max -min +1;
    return String.fromCharCode(Math.floor(Math.random() *limit) + min)
}
export function getSpecial (){
    const special ="!\"@#$%^&'()+*,./:;=<>?{}[]_-~`|";
    return special[Math.floor(Math.random()*special.length)]
}