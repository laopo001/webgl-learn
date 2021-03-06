/**
 * @name math
 * @namespace
 * @description Math API
 */
export const math = {
    /**
     * @name math.DEG_TO_RAD
     * @description Conversion factor between degrees and radians
     * @type Number
     * @example
     * // Convert 180 degrees to pi radians
     * var rad = 180 * math.DEG_TO_RAD;
     */
    DEG_TO_RAD: Math.PI / 180,

    /**
     * @name math.RAD_TO_DEG
     * @description Conversion factor between degrees and radians
     * @type Number
     * @example
     * // Convert pi radians to 180 degrees
     * var deg = Math.PI * math.RAD_TO_DEG;
     */
    RAD_TO_DEG: 180 / Math.PI,

    /**
    * @name math.INV_LOG2
    * @description Inverse log 2
    * @type Number
    */
    INV_LOG2: 1 / Math.log(2),

    /**
     * @function
     * @name math.clamp
     * @description Clamp a number between min and max inclusive.
     * @param {Number} value Number to clamp
     * @param {Number} min Min value
     * @param {Number} max Max value
     * @returns {Number} The clamped value
     */
    clamp: function (value: number, min: number, max: number) {
        if (value >= max) return max;
        if (value <= min) return min;
        return value;
    },

    /**
     * @function
     * @name math.intToBytes24
     * @description Convert an 24 bit integer into an array of 3 bytes.
     * @param {Number} i Number holding an integer value
     * @returns {Number[]} An array of 3 bytes.
     * @example
     * // Set bytes to [0x11, 0x22, 0x33]
     * var bytes = math.intToBytes24(0x112233);
     */
    intToBytes24: function (i: number): [number, number, number] {
        var r, g, b;

        r = (i >> 16) & 0xff;
        g = (i >> 8) & 0xff;
        b = (i) & 0xff;

        return [r, g, b];
    },

    /**
     * @function
     * @name math.intToBytes32
     * @description Convert an 32 bit integer into an array of 4 bytes.
     * @returns {Number[]} An array of 4 bytes
     * @param {Number} i Number holding an integer value
     * @example
     * // Set bytes to [0x11, 0x22, 0x33, 0x44]
     * var bytes = math.intToBytes32(0x11223344);
     */
    intToBytes32: function (i: number): [number, number, number, number] {
        var r, g, b, a;

        r = (i >> 24) & 0xff;
        g = (i >> 16) & 0xff;
        b = (i >> 8) & 0xff;
        a = (i) & 0xff;

        return [r, g, b, a];
    },

    /**
     * @function
     * @name math.bytesToInt24
     * @description Convert 3 8 bit Numbers into a single unsigned 24 bit Number.
     * @example
     * // Set result1 to 0x112233 from an array of 3 values
     * var result1 = math.bytesToInt24([0x11, 0x22, 0x33]);
     *
     * // Set result2 to 0x112233 from 3 discrete values
     * var result2 = math.bytesToInt24(0x11, 0x22, 0x33);
     * @param {Number} r A single byte (0-255)
     * @param {Number} g A single byte (0-255)
     * @param {Number} b A single byte (0-255)
     * @returns {Number} A single unsigned 24 bit Number.
     */
    bytesToInt24: function (r: number | [number, number, number], g?: number, b?: number): number {
        if (Array.isArray(r)) {
            b = r[2];
            g = r[1];
            r = r[0];
        }
        return ((r << 16) | (g << 8) | b);
    },

    /**
     * @function
     * @name math.bytesToInt32
     * @description Convert 4 1-byte Numbers into a single unsigned 32bit Number.
     * @returns {Number} A single unsigned 32bit Number.
     * @example
      * // Set result1 to 0x11223344 from an array of 4 values
      * var result1 = math.bytesToInt32([0x11, 0x22, 0x33, 0x44]);
      *
      * // Set result2 to 0x11223344 from 4 discrete values
      * var result2 = math.bytesToInt32(0x11, 0x22, 0x33, 0x44);
     * @param {Number} r A single byte (0-255)
     * @param {Number} g A single byte (0-255)
     * @param {Number} b A single byte (0-255)
     * @param {Number} a A single byte (0-255)
     */
    bytesToInt32: function (r: number | [number, number, number], g: number, b: number, a: number): number {
        if (Array.isArray(r)) {
            a = r[3];
            b = r[2];
            g = r[1];
            r = r[0];
        }
        // Why ((r << 24)>>>32)?
        // << operator uses signed 32 bit numbers, so 128<<24 is negative.
        // >>> used unsigned so >>>32 converts back to an unsigned.
        // See http://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
        return ((r << 24) | (g << 16) | (b << 8) | a) >>> 32;
    },

    /**
     * @function
     * @name math.lerp
     * @returns {Number} The linear interpolation of two numbers.
     * @description Calculates the linear interpolation of two numbers.
     * @param {Number} a Number to linearly interpolate from.
     * @param {Number} b Number to linearly interpolate to.
     * @param {Number} alpha The value controlling the result of interpolation. When alpha is 0,
     * a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
     * a and b is returned. alpha is clamped between 0 and 1.
     */
    lerp: function (a: number, b: number, alpha: number): number {
        return a + (b - a) * math.clamp(alpha, 0, 1);
    },

    /**
     * @function
     * @name math.lerpAngle
     * @description Calculates the linear interpolation of two angles ensuring that interpolation
     * is correctly performed across the 360 to 0 degree boundary. Angles are supplied in degrees.
     * @returns {Number} The linear interpolation of two angles
     * @param {Number} a Angle (in degrees) to linearly interpolate from.
     * @param {Number} b Angle (in degrees) to linearly interpolate to.
     * @param {Number} alpha The value controlling the result of interpolation. When alpha is 0,
     * a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
     * a and b is returned. alpha is clamped between 0 and 1.
     */
    lerpAngle: function (a: number, b: number, alpha: number): number {
        if (b - a > 180) {
            b -= 360;
        }
        if (b - a < -180) {
            b += 360;
        }
        return math.lerp(a, b, math.clamp(alpha, 0, 1));
    },

    /**
     * @function
     * @name math.powerOfTwo
     * @description Returns true if argument is a power-of-two and false otherwise.
     * @param {Number} x Number to check for power-of-two property.
     * @returns {Boolean} true if power-of-two and false otherwise.
     */
    powerOfTwo: function (x: number): boolean {
        return ((x !== 0) && !(x & (x - 1)));
    },

    /**
     * @function
     * @name math.nextPowerOfTwo
     * @description Returns the next power of 2 for the specified value.
     * @param {Number} val The value for which to calculate the next power of 2.
     * @returns {Number} The next power of 2.
     */
    nextPowerOfTwo: function (val: number): number {
        val--;
        val = (val >> 1) | val;
        val = (val >> 2) | val;
        val = (val >> 4) | val;
        val = (val >> 8) | val;
        val = (val >> 16) | val;
        val++;
        return val;
    },

    /**
     * @function
     * @name math.random
     * @description Return a pseudo-random number between min and max.
     * The number generated is in the range [min, max), that is inclusive of the minimum but exclusive of the maximum.
     * @param {Number} min Lower bound for range.
     * @param {Number} max Upper bound for range.
     * @returns {Number} Pseudo-random number between the supplied range.
     */
    random: function (min: number, max: number): number {
        var diff = max - min;
        return Math.random() * diff + min;
    },

    /**
     * @function
     * @name math.smoothstep
     * @description The function interpolates smoothly between two input values based on
     * a third one that should be between the first two. The returned value is clamped
     * between 0 and 1.
     * <br/>The slope (i.e. derivative) of the smoothstep function starts at 0 and ends at 0.
     * This makes it easy to create a sequence of transitions using smoothstep to interpolate
     * each segment rather than using a more sophisticated or expensive interpolation technique.
     * <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
     * @param {Number} min The lower bound of the interpolation range.
     * @param {Number} max The upper bound of the interpolation range.
     * @param {Number} x The value to interpolate.
     * @returns {Number} The smoothly interpolated value clamped between zero and one.
     */
    smoothstep: function (min: number, max: number, x: number): number {
        if (x <= min) return 0;
        if (x >= max) return 1;

        x = (x - min) / (max - min);

        return x * x * (3 - 2 * x);
    },

    /**
     * @function
     * @name math.smootherstep
     * @description An improved version of the math.smoothstep function which has zero
     * 1st and 2nd order derivatives at t=0 and t=1.
     * <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
     * @param {Number} min The lower bound of the interpolation range.
     * @param {Number} max The upper bound of the interpolation range.
     * @param {Number} x The value to interpolate.
     * @returns {Number} The smoothly interpolated value clamped between zero and one.
     */
    smootherstep: function (min: number, max: number, x: number): number {
        if (x <= min) return 0;
        if (x >= max) return 1;

        x = (x - min) / (max - min);

        return x * x * x * (x * (x * 6 - 15) + 10);
    }
};

// math.intToBytes = math.intToBytes32;
// math.bytesToInt = math.bytesToInt32;

// IE doesn't have native log2
if (!Math.log2) {
    Math.log2 = function (x) {
        return Math.log(x) * math.INV_LOG2;
    };
}

