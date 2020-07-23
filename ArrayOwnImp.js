function ArraySpec() {
    let arr = Object.create(ArraySpec.prototype);
    Object.defineProperty(arr, 'length', {
        enumerable: false,
//         writable: true,
//         value: 0,
        set: function(num) {
            for (let index = num; this.hasOwnProperty(index) && index >= num; index++) {
               delete this[index];
            }
        },
        get: function() {
            return Object.keys(this).length;
        }

    });
    arr.length = 0;

    for (let arg in arguments) {
        arr[arg] = arguments[arg];
        arr.length++;
    }

    return arr;
}

ArraySpec.prototype.push = function (val) {
    this[this.length] = val;
    this.length++;
    return this.length;
};

ArraySpec.prototype.pop = function () {
    const toDelete = this[this.length-1];
    this.length--;
    //delete this[this.length];
    return toDelete;
};

ArraySpec.prototype.filter = function (cb) {
    const arr = new ArraySpec();
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            if (cb(this[key], key)) {
                arr.push(this[key]);
            }          
        }
    }
    return arr;
};

