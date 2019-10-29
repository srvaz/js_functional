if(!Array.prototype.$flatMap) {
    // $flatMap returns a one dimension array
    Array.prototype.$flatMap = function(callBack) {
        return this.map(callBack).reduce((destArray, array) => 
            destArray.concat(array), []);
    };
}