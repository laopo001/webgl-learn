/**
* @name Vec3
* @class A 3-dimensional vector.
* @description Creates a new Vec3 object
* @param {Number} [x] The x value. If x is an array of length 3, the array will be used to populate all components.
* @param {Number} [y] The y value
* @param {Number} [z] The z value
* @example
* var v = new Vec3(1,2,3);
*/
export class Vec3 {
    data: Float32Array;
    constructor();
    constructor(x: number, y: number, z: number)
    constructor(x: [number, number, number])
    constructor(x?, y?, z?) {
        if (x && x.length === 3) {
            this.data = new Float32Array(x);
            return;
        }

        this.data = new Float32Array(3);

        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
    }

    /**
     * @function
     * @name Vec3#add
     * @description Adds a 3-dimensional vector to another in place.
     * @param {Vec3} rhs The vector to add to the specified vector.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     *
     * a.add(b);
     *
     * // Should output [30, 30, 30]
     * console.log("The result of the addition is: " + a.toString());
     */
    add(rhs: Vec3): this {
        var a = this.data,
            b = rhs.data;

        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#add2
     * @description Adds two 3-dimensional vectors together and returns the result.
     * @param {Vec3} lhs The first vector operand for the addition.
     * @param {Vec3} rhs The second vector operand for the addition.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     * var r = new Vec3();
     *
     * r.add2(a, b);
     * // Should output [30, 30, 30]
     *
     * console.log("The result of the addition is: " + r.toString());
     */
    add2(lhs: Vec3, rhs: Vec3): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#clone
     * @description Returns an identical copy of the specified 3-dimensional vector.
     * @returns {Vec3} A 3-dimensional vector containing the result of the cloning.
     * @example
     * var v = new Vec3(10, 20, 30);
     * var vclone = v.clone();
     * console.log("The result of the cloning is: " + vclone.toString());
     */
    clone(): Vec3 {
        return new Vec3().copy(this);
    }

    /**
     * @function
     * @name Vec3#copy
     * @description Copied the contents of a source 3-dimensional vector to a destination 3-dimensional vector.
     * @param {Vec3} rhs A vector to copy to the specified vector.
     * @returns {Vec3} Self for chaining.
     * @example
     * var src = new Vec3(10, 20, 30);
     * var dst = new Vec3();
     *
     * dst.copy(src);
     *
     * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     */
    copy(rhs: Vec3): this {
        var a = this.data,
            b = rhs.data;

        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#cross
     * @description Returns the result of a cross product operation performed on the two specified 3-dimensional vectors.
     * @param {Vec3} lhs The first 3-dimensional vector operand of the cross product.
     * @param {Vec3} rhs The second 3-dimensional vector operand of the cross product.
     * @returns {Vec3} Self for chaining.
     * @example
     * var back = new Vec3().cross(Vec3.RIGHT, Vec3.UP);
     *
     * // Should print the Z axis (i.e. [0, 0, 1])
     * console.log("The result of the cross product is: " + back.toString());
     */
    cross(lhs: Vec3, rhs: Vec3): this {
        var a, b, r, ax, ay, az, bx, by, bz;

        a = lhs.data;
        b = rhs.data;
        r = this.data;

        ax = a[0];
        ay = a[1];
        az = a[2];
        bx = b[0];
        by = b[1];
        bz = b[2];

        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;

        return this;
    }

    /**
     * @function
     * @name Vec3#dot
     * @description Returns the result of a dot product operation performed on the two specified 3-dimensional vectors.
     * @param {Vec3} rhs The second 3-dimensional vector operand of the dot product.
     * @returns {Number} The result of the dot product operation.
     * @example
     * var v1 = new Vec3(5, 10, 20);
     * var v2 = new Vec3(10, 20, 40);
     * var v1dotv2 = v1.dot(v2);
     * console.log("The result of the dot product is: " + v1dotv2);
     */
    dot(rhs: Vec3): number {
        var a = this.data,
            b = rhs.data;

        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    /**
     * @function
     * @name Vec3#equals
     * @description Reports whether two vectors are equal.
     * @param {Vec3} rhs The vector to compare to the specified vector.
     * @returns {Boolean} true if the vectors are equal and false otherwise.
     * @example
     * var a = new Vec3(1, 2, 3);
     * var b = new Vec3(4, 5, 6);
     * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     */
    equals(rhs: Vec3): boolean {
        var a = this.data,
            b = rhs.data;

        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }

    /**
     * @function
     * @name Vec3#length
     * @description Returns the magnitude of the specified 3-dimensional vector.
     * @returns {Number} The magnitude of the specified 3-dimensional vector.
     * @example
     * var vec = new Vec3(3, 4, 0);
     * var len = vec.length();
     * // Should output 5
     * console.log("The length of the vector is: " + len);
     */
    length(): number {
        var v = this.data;

        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }

    /**
     * @function
     * @name Vec3#lengthSq
     * @description Returns the magnitude squared of the specified 3-dimensional vector.
     * @returns {Number} The magnitude of the specified 3-dimensional vector.
     * @example
     * var vec = new Vec3(3, 4, 0);
     * var len = vec.lengthSq();
     * // Should output 25
     * console.log("The length squared of the vector is: " + len);
     */
    lengthSq(): number {
        var v = this.data;

        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    }

    /**
     * @function
     * @name Vec3#lerp
     * @description Returns the result of a linear interpolation between two specified 3-dimensional vectors.
     * @param {Vec3} lhs The 3-dimensional to interpolate from.
     * @param {Vec3} rhs The 3-dimensional to interpolate to.
     * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
     * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
     * a ray extrapolated from this line.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(0, 0, 0);
     * var b = new Vec3(10, 10, 10);
     * var r = new Vec3();
     *
     * r.lerp(a, b, 0);   // r is equal to a
     * r.lerp(a, b, 0.5); // r is 5, 5, 5
     * r.lerp(a, b, 1);   // r is equal to b
     */
    lerp(lhs: Vec3, rhs: Vec3, alpha: number): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);

        return this;
    }

    /**
     * @function
     * @name Vec3#mul
     * @description Multiplies a 3-dimensional vector to another in place.
     * @param {Vec3} rhs The 3-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(2, 3, 4);
     * var b = new Vec3(4, 5, 6);
     *
     * a.mul(b);
     *
     * // Should output 8, 15, 24
     * console.log("The result of the multiplication is: " + a.toString());
     */
    mul(rhs: Vec3): this {
        var a = this.data,
            b = rhs.data;

        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#mul2
     * @description Returns the result of multiplying the specified 3-dimensional vectors together.
     * @param {Vec3} lhs The 3-dimensional vector used as the first multiplicand of the operation.
     * @param {Vec3} rhs The 3-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(2, 3, 4);
     * var b = new Vec3(4, 5, 6);
     * var r = new Vec3();
     *
     * r.mul2(a, b);
     *
     * // Should output 8, 15, 24
     * console.log("The result of the multiplication is: " + r.toString());
     */
    mul2(lhs: Vec3, rhs: Vec3): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#normalize
     * @description Returns the specified 3-dimensional vector copied and converted to a unit vector.
     * If the vector has a length of zero, the vector's elements will be set to zero.
     * @returns {Vec3} The result of the normalization.
     * @example
     * var v = new Vec3(25, 0, 0);
     *
     * v.normalize();
     *
     * // Should output 1, 0, 0, 0
     * console.log("The result of the vector normalization is: " + v.toString());
     */
    normalize(): this {
        var v = this.data;

        var lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
        }

        return this;
    }

    /**
     * @function
     * @name  Vec3#project
     * @description Projects this 3-dimensional vector onto the specified vector.
     * @param {Vec3} rhs The vector onto which the original vector will be projected on.
     * @returns {Vec3} Self for chaining.
     * @example
     * var v = new Vec3(5, 5, 5);
     * var normal = new Vec3(1, 0, 0);
     *
     * v.project(normal);
     *
     * // Should output 5, 0, 0
     * console.log("The result of the vector projection is: " + v.toString());
     */
    project(rhs: Vec3): this {
        var a = this.data;
        var b = rhs.data;
        var a_dot_b = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        var b_dot_b = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
        var s = a_dot_b / b_dot_b;
        a[0] = b[0] * s;
        a[1] = b[1] * s;
        a[2] = b[2] * s;
        return this;
    }

    /**
     * @function
     * @name Vec3#scale
     * @description Scales each dimension of the specified 3-dimensional vector by the supplied
     * scalar value.
     * @param {Number} scalar The value by which each vector component is multiplied.
     * @returns {Vec3} Self for chaining.
     * @example
     * var v = new Vec3(2, 4, 8);
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

        return this;
    }

    /**
     * @function
     * @name Vec3#set
     * @description Sets the specified 3-dimensional vector to the supplied numerical values.
     * @param {Number} x The value to set on the first component of the vector.
     * @param {Number} y The value to set on the second component of the vector.
     * @param {Number} z The value to set on the third component of the vector.
     * @example
     * var v = new Vec3();
     * v.set(5, 10, 20);
     *
     * // Should output 5, 10, 20
     * console.log("The result of the vector set is: " + v.toString());
     */
    set(x: number, y: number, z: number): this {
        var v = this.data;

        v[0] = x;
        v[1] = y;
        v[2] = z;

        return this;
    }

    /**
     * @function
     * @name Vec3#sub
     * @description Subtracts a 3-dimensional vector from another in place.
     * @param {Vec3} rhs The vector to add to the specified vector.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     *
     * a.sub(b);
     *
     * // Should output [-10, -10, -10]
     * console.log("The result of the addition is: " + a.toString());
     */
    sub(rhs: Vec3): this {
        var a = this.data,
            b = rhs.data;

        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#sub2
     * @description Subtracts two 3-dimensional vectors from one another and returns the result.
     * @param {Vec3} lhs The first vector operand for the addition.
     * @param {Vec3} rhs The second vector operand for the addition.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     * var r = new Vec3();
     *
     * r.sub2(a, b);
     *
     * // Should output [-10, -10, -10]
     * console.log("The result of the addition is: " + r.toString());
     */
    sub2(lhs: Vec3, rhs: Vec3): this {
        var a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];

        return this;
    }

    /**
     * @function
     * @name Vec3#toString
     * @description Converts the vector to string form.
     * @returns {String} The vector in string form.
     * @example
     * var v = new Vec3(20, 10, 5);
     * // Should output '[20, 10, 5]'
     * console.log(v.toString());
     */
    toString(): string {
        return "[" + this.data[0] + ", " + this.data[1] + ", " + this.data[2] + "]";
    }

    /**
     * @name Vec3#x
     * @type Number
     * @description The first component of the vector.
     * @example
     * var vec = new Vec3(10, 20, 30);
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
     * @name Vec3#y
     * @type Number
     * @description The second component of the vector.
     * @example
     * var vec = new Vec3(10, 20, 30);
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
     * @name Vec3#z
     * @type Number
     * @description The third component of the vector.
     * @example
     * var vec = new Vec3(10, 20, 30);
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
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.BACK
     * @description A constant vector set to [0, 0, 1].
     */
    static readonly BACK: Vec3 = new Vec3(0, 0, 1);

    /**
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.DOWN
     * @description A constant vector set to [0, -1, 0].
     */
    static readonly DOWN: Vec3 = new Vec3(0, -1, 0);

    /**
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.FORWARD
     * @description A constant vector set to [0, 0, -1].
     */
    static readonly FORWARD: Vec3 = new Vec3(0, 0, -1);

    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.LEFT
     * @description A constant vector set to [-1, 0, 0].
     */
    static readonly LEFT: Vec3 = new Vec3(-1, 0, 0);

    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.ONE
     * @description A constant vector set to [1, 1, 1].
     */
    static readonly ONE: Vec3 = new Vec3(1, 1, 1);

    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.RIGHT
     * @description A constant vector set to [1, 0, 0].
     */
    static readonly RIGHT: Vec3 = new Vec3(1, 0, 0);

    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.UP
     * @description A constant vector set to [0, 1, 0].
     */
    static readonly UP: Vec3 = new Vec3(0, 1, 0);

    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.ZERO
     * @description A constant vector set to [0, 0, 0].
     */
    static readonly ZERO: Vec3 = new Vec3(0, 0, 0);




}



