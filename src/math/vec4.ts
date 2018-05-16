

/**
* @name Vec4
* @class A 4-dimensional vector.
* @description Creates a new Vec4 object
* @param {Number} [x] The x value. If x is an array of length 4, the array will be used to populate all components.
* @param {Number} [y] The y value
* @param {Number} [z] The z value
* @param {Number} [w] The w value
*/
export class Vec4 {
    data: Float32Array;
    constructor();
    constructor(x: number, y: number, z: number, w: number)
    constructor(x: [number, number, number, number])
    constructor(x?, y?, z?, w?) {
        if (x && x.length === 4) {
            this.data = new Float32Array(x);
            return;
        }

        this.data = new Float32Array(4);

        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
        this.data[3] = w || 0;
    }


    /**
         * @function
         * @name Vec4#add
         * @description Adds a 4-dimensional vector to another in place.
         * @param {Vec4} rhs The vector to add to the specified vector.
         * @returns {Vec4} Self for chaining.
         * @example
         * var a = new Vec4(10, 10, 10, 10);
         * var b = new Vec4(20, 20, 20, 20);
         *
         * a.add(b);
         *
         * // Should output [30, 30, 30]
         * console.log("The result of the addition is: " + a.toString());
         */
    add(rhs: Vec4): this {
        var a = this.data,
            b = rhs.data;

        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        a[3] += b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#add2
     * @description Adds two 4-dimensional vectors together and returns the result.
     * @param {Vec4} lhs The first vector operand for the addition.
     * @param {Vec4} rhs The second vector operand for the addition.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(10, 10, 10, 10);
     * var b = new Vec4(20, 20, 20, 20);
     * var r = new Vec4();
     *
     * r.add2(a, b);
     * // Should output [30, 30, 30]
     *
     * console.log("The result of the addition is: " + r.toString());
     */
    add2(lhs: Vec4, rhs: Vec4): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#clone
     * @description Returns an identical copy of the specified 4-dimensional vector.
     * @returns {Vec4} A 4-dimensional vector containing the result of the cloning.
     * @example
     * var v = new Vec4(10, 20, 30, 40);
     * var vclone = v.clone();
     * console.log("The result of the cloning is: " + vclone.toString());
     */
    clone(): Vec4 {
        return new Vec4().copy(this);
    }

    /**
     * @function
     * @name Vec4#copy
     * @description Copied the contents of a source 4-dimensional vector to a destination 4-dimensional vector.
     * @param {Vec4} rhs A vector to copy to the specified vector.
     * @returns {Vec4} Self for chaining.
     * @example
     * var src = new Vec4(10, 20, 30, 40);
     * var dst = new Vec4();
     *
     * dst.copy(src);
     *
     * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     */
    copy(rhs: Vec4): this {
        var a = this.data,
            b = rhs.data;

        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#dot
     * @description Returns the result of a dot product operation performed on the two specified 4-dimensional vectors.
     * @param {Vec4} rhs The second 4-dimensional vector operand of the dot product.
     * @returns {Number} The result of the dot product operation.
     * @example
     * var v1 = new Vec4(5, 10, 20, 40);
     * var v2 = new Vec4(10, 20, 40, 80);
     * var v1dotv2 = v1.dot(v2);
     * console.log("The result of the dot product is: " + v1dotv2);
     */
    dot(rhs: Vec4): Number {
        var a = this.data,
            b = rhs.data;

        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }

    /**
     * @function
     * @name Vec4#equals
     * @description Reports whether two vectors are equal.
     * @param {Vec4} rhs The vector to compare to the specified vector.
     * @returns {Boolean} true if the vectors are equal and false otherwise.
     * @example
     * var a = new Vec4(1, 2, 3, 4);
     * var b = new Vec4(5, 6, 7, 8);
     * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     */
    equals(rhs: Vec4): boolean {
        var a = this.data,
            b = rhs.data;

        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }

    /**
     * @function
     * @name Vec4#length
     * @description Returns the magnitude of the specified 4-dimensional vector.
     * @returns {Number} The magnitude of the specified 4-dimensional vector.
     * @example
     * var vec = new Vec4(3, 4, 0, 0);
     * var len = vec.length();
     * // Should output 5
     * console.log("The length of the vector is: " + len);
     */
    length(): number {
        var v = this.data;

        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
    }

    /**
     * @function
     * @name Vec4#lengthSq
     * @description Returns the magnitude squared of the specified 4-dimensional vector.
     * @returns {Number} The magnitude of the specified 4-dimensional vector.
     * @example
     * var vec = new Vec4(3, 4, 0);
     * var len = vec.lengthSq();
     * // Should output 25
     * console.log("The length squared of the vector is: " + len);
     */
    lengthSq(): number {
        var v = this.data;

        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
    }

    /**
     * @function
     * @name Vec4#lerp
     * @description Returns the result of a linear interpolation between two specified 4-dimensional vectors.
     * @param {Vec4} lhs The 4-dimensional to interpolate from.
     * @param {Vec4} rhs The 4-dimensional to interpolate to.
     * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
     * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
     * a ray extrapolated from this line.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(0, 0, 0, 0);
     * var b = new Vec4(10, 10, 10, 10);
     * var r = new Vec4();
     *
     * r.lerp(a, b, 0);   // r is equal to a
     * r.lerp(a, b, 0.5); // r is 5, 5, 5, 5
     * r.lerp(a, b, 1);   // r is equal to b
     */
    lerp(lhs: Vec4, rhs: Vec4, alpha: number): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        r[3] = a[3] + alpha * (b[3] - a[3]);

        return this;
    }

    /**
     * @function
     * @name Vec4#mul
     * @description Multiplies a 4-dimensional vector to another in place.
     * @param {Vec4} rhs The 4-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(2, 3, 4, 5);
     * var b = new Vec4(4, 5, 6, 7);
     *
     * a.mul(b);
     *
     * // Should output 8, 15, 24, 35
     * console.log("The result of the multiplication is: " + a.toString());
     */
    mul(rhs: Vec4): this {
        var a = this.data,
            b = rhs.data;

        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];
        a[3] *= b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#mul2
     * @description Returns the result of multiplying the specified 4-dimensional vectors together.
     * @param {Vec4} lhs The 4-dimensional vector used as the first multiplicand of the operation.
     * @param {Vec4} rhs The 4-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(2, 3, 4, 5);
     * var b = new Vec4(4, 5, 6, 7);
     * var r = new Vec4();
     *
     * r.mul2(a, b);
     *
     * // Should output 8, 15, 24, 35
     * console.log("The result of the multiplication is: " + r.toString());
     */
    mul2(lhs: Vec4, rhs: Vec4): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];
        r[3] = a[3] * b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#normalize
     * @description Returns the specified 4-dimensional vector copied and converted to a unit vector.
     * If the vector has a length of zero, the vector's elements will be set to zero.
     * @returns {Vec4} The result of the normalization.
     * @example
     * var v = new Vec4(25, 0, 0, 0);
     *
     * v.normalize();
     *
     * // Should output 1, 0, 0, 0
     * console.log("The result of the vector normalization is: " + v.toString());
     */
    normalize(): this {
        var v = this.data;

        var lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
            v[3] *= invLength;
        }

        return this;
    }

    /**
     * @function
     * @name Vec4#scale
     * @description Scales each dimension of the specified 4-dimensional vector by the supplied
     * scalar value.
     * @param {Number} scalar The value by which each vector component is multiplied.
     * @returns {Vec4} Self for chaining.
     * @example
     * var v = new Vec4(2, 4, 8, 16);
     *
     * // Multiply by 2
     * v.scale(2);
     *
     * // Negate
     * v.scale(-1);
     *
     * // Divide by 2
     * v.scale(0.5);
     */
    scale(scalar: number): this {
        var v = this.data;

        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        v[3] *= scalar;

        return this;
    }

    /**
     * @function
     * @name Vec4#set
     * @description Sets the specified 4-dimensional vector to the supplied numerical values.
     * @param {Number} x The value to set on the first component of the vector.
     * @param {Number} y The value to set on the second component of the vector.
     * @param {Number} z The value to set on the third component of the vector.
     * @param {Number} w The value to set on the fourth component of the vector.
     * @example
     * var v = new Vec4();
     * v.set(5, 10, 20, 40);
     *
     * // Should output 5, 10, 20, 40
     * console.log("The result of the vector set is: " + v.toString());
     */
    set(x: number, y: number, z: number, w: number): this {
        var v = this.data;

        v[0] = x;
        v[1] = y;
        v[2] = z;
        v[3] = w;

        return this;
    }

    /**
     * @function
     * @name Vec4#sub
     * @description Subtracts a 4-dimensional vector from another in place.
     * @param {Vec4} rhs The vector to add to the specified vector.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(10, 10, 10, 10);
     * var b = new Vec4(20, 20, 20, 20);
     *
     * a.sub(b);
     *
     * // Should output [-10, -10, -10, -10]
     * console.log("The result of the subtraction is: " + a.toString());
     */
    sub(rhs: Vec4): this {
        var a = this.data,
            b = rhs.data;

        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        a[3] -= b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#sub2
     * @description Subtracts two 4-dimensional vectors from one another and returns the result.
     * @param {Vec4} lhs The first vector operand for the subtraction.
     * @param {Vec4} rhs The second vector operand for the subtraction.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(10, 10, 10, 10);
     * var b = new Vec4(20, 20, 20, 20);
     * var r = new Vec4();
     *
     * r.sub2(a, b);
     *
     * // Should output [-10, -10, -10, -10]
     * console.log("The result of the subtraction is: " + r.toString());
     */
    sub2(lhs: Vec4, rhs: Vec4): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        r[3] = a[3] - b[3];

        return this;
    }

    /**
     * @function
     * @name Vec4#toString
     * @description Converts the vector to string form.
     * @returns {String} The vector in string form.
     * @example
     * var v = new Vec4(20, 10, 5, 0);
     * // Should output '[20, 10, 5, 0]'
     * console.log(v.toString());
     */
    toString(): string {
        return "[" + this.data[0] + ", " + this.data[1] + ", " + this.data[2] + ", " + this.data[3] + "]";
    }

    /**
     * @field
     * @type Number
     * @name Vec4#x
     * @description The first component of the vector.
     * @example
     * var vec = new Vec4(10, 20, 30, 40);
     *
     * // Get x
     * var x = vec.x;
     *
     * // Set x
     * vec.x = 0;
     */
    get x(): number {
        return this.data[0];
    };
    set x(value: number) {
        this.data[0] = value;
    }

    /**
     * @field
     * @type Number
     * @name Vec4#y
     * @description The second component of the vector.
     * @example
     * var vec = new Vec4(10, 20, 30, 40);
     *
     * // Get y
     * var y = vec.y;
     *
     * // Set y
     * vec.y = 0;
     */
    get y(): number {
        return this.data[1];
    };
    set y(value: number) {
        this.data[1] = value;
    }

    /**
     * @field
     * @type Number
     * @name Vec4#z
     * @description The third component of the vector.
     * @example
     * var vec = new Vec4(10, 20, 30, 40);
     *
     * // Get z
     * var z = vec.z;
     *
     * // Set z
     * vec.z = 0;
     */
    get z(): number {
        return this.data[2];
    };
    set z(value: number) {
        this.data[2] = value;
    }

    /**
     * @field
     * @type Number
     * @name Vec4#w
     * @description The fourth component of the vector.
     * @example
     * var vec = new Vec4(10, 20, 30, 40);
     *
     * // Get w
     * var w = vec.w;
     *
     * // Set w
     * vec.w = 0;
     */
    get w(): number {
        return this.data[2];
    };
    set w(value: number) {
        this.data[2] = value;
    }

    /**
     * @field
     * @static
     * @readonly
     * @type Vec4
     * @name Vec4.ONE
     * @description A constant vector set to [1, 1, 1, 1].
     */
    static readonly ONE: Vec4

    /**
     * @field
     * @static
     * @readonly
     * @type Vec4
     * @name Vec4.ZERO
     * @description A constant vector set to [0, 0, 0, 0].
     */
    static readonly ZERO: Vec4
}

