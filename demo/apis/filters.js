 export const price = (num)=> {
    var num = (num*10000 || '--').toString()
	let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; } 
    return result;
}
  export const time = (time) => { 
 	const date = new Date(new Date(time) - 8 * 3600 * 1000)
 	const year = date.getFullYear()
 	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
 	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
 	const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
 	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
 	const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
 	return year + '/' + month + '/' + day 
 }