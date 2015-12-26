/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2015 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
/**
@license
mersenne-twister.js - https://gist.github.com/banksean/300494

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

!function(){define("Core/defined",[],function(){"use strict";var t=function(t){return void 0!==t};return t}),define("Core/freezeObject",["./defined"],function(t){"use strict";var E=Object.freeze;return t(E)||(E=function(t){return t}),E}),define("Core/defaultValue",["./freezeObject"],function(t){"use strict";var E=function(t,E){return void 0!==t?t:E};return E.EMPTY_OBJECT=t({}),E}),define("Core/DeveloperError",["./defined"],function(t){"use strict";var E=function(t){this.name="DeveloperError",this.message=t;var E;try{throw new Error}catch(e){E=e.stack}this.stack=E};return E.prototype.toString=function(){var E=this.name+": "+this.message;return t(this.stack)&&(E+="\n"+this.stack.toString()),E},E.throwInstantiationError=function(){throw new E("This function defines an interface and should not be called directly.")},E}),define("ThirdParty/mersenne-twister",[],function(){var t=function(t){void 0==t&&(t=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,this.init_genrand(t)};return t.prototype.init_genrand=function(t){for(this.mt[0]=t>>>0,this.mti=1;this.mti<this.N;this.mti++){var t=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30;this.mt[this.mti]=(1812433253*((4294901760&t)>>>16)<<16)+1812433253*(65535&t)+this.mti,this.mt[this.mti]>>>=0}},t.prototype.genrand_int32=function(){var t,E=new Array(0,this.MATRIX_A);if(this.mti>=this.N){var e;for(this.mti==this.N+1&&this.init_genrand(5489),e=0;e<this.N-this.M;e++)t=this.mt[e]&this.UPPER_MASK|this.mt[e+1]&this.LOWER_MASK,this.mt[e]=this.mt[e+this.M]^t>>>1^E[1&t];for(;e<this.N-1;e++)t=this.mt[e]&this.UPPER_MASK|this.mt[e+1]&this.LOWER_MASK,this.mt[e]=this.mt[e+(this.M-this.N)]^t>>>1^E[1&t];t=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^t>>>1^E[1&t],this.mti=0}return t=this.mt[this.mti++],t^=t>>>11,t^=t<<7&2636928640,t^=t<<15&4022730752,t^=t>>>18,t>>>0},t.prototype.random=function(){return this.genrand_int32()*(1/4294967296)},t}),define("Core/Math",["../ThirdParty/mersenne-twister","./defaultValue","./defined","./DeveloperError"],function(t,E,e,r){"use strict";var n={};n.EPSILON1=.1,n.EPSILON2=.01,n.EPSILON3=.001,n.EPSILON4=1e-4,n.EPSILON5=1e-5,n.EPSILON6=1e-6,n.EPSILON7=1e-7,n.EPSILON8=1e-8,n.EPSILON9=1e-9,n.EPSILON10=1e-10,n.EPSILON11=1e-11,n.EPSILON12=1e-12,n.EPSILON13=1e-13,n.EPSILON14=1e-14,n.EPSILON15=1e-15,n.EPSILON16=1e-16,n.EPSILON17=1e-17,n.EPSILON18=1e-18,n.EPSILON19=1e-19,n.EPSILON20=1e-20,n.GRAVITATIONALPARAMETER=3986004418e5,n.SOLAR_RADIUS=6955e5,n.LUNAR_RADIUS=1737400,n.SIXTY_FOUR_KILOBYTES=65536,n.sign=function(t){return t>0?1:0>t?-1:0},n.signNotZero=function(t){return 0>t?-1:1},n.toSNorm=function(t){return Math.round(255*(.5*n.clamp(t,-1,1)+.5))},n.fromSNorm=function(t){return n.clamp(t,0,255)/255*2-1},n.sinh=function(t){var E=Math.pow(Math.E,t),e=Math.pow(Math.E,-1*t);return.5*(E-e)},n.cosh=function(t){var E=Math.pow(Math.E,t),e=Math.pow(Math.E,-1*t);return.5*(E+e)},n.lerp=function(t,E,e){return(1-e)*t+e*E},n.PI=Math.PI,n.ONE_OVER_PI=1/Math.PI,n.PI_OVER_TWO=.5*Math.PI,n.PI_OVER_THREE=Math.PI/3,n.PI_OVER_FOUR=Math.PI/4,n.PI_OVER_SIX=Math.PI/6,n.THREE_PI_OVER_TWO=3*Math.PI*.5,n.TWO_PI=2*Math.PI,n.ONE_OVER_TWO_PI=1/(2*Math.PI),n.RADIANS_PER_DEGREE=Math.PI/180,n.DEGREES_PER_RADIAN=180/Math.PI,n.RADIANS_PER_ARCSECOND=n.RADIANS_PER_DEGREE/3600,n.toRadians=function(t){return t*n.RADIANS_PER_DEGREE},n.toDegrees=function(t){return t*n.DEGREES_PER_RADIAN},n.convertLongitudeRange=function(t){var E=n.TWO_PI,e=t-Math.floor(t/E)*E;return e<-Math.PI?e+E:e>=Math.PI?e-E:e},n.negativePiToPi=function(t){return n.zeroToTwoPi(t+n.PI)-n.PI},n.zeroToTwoPi=function(t){var E=n.mod(t,n.TWO_PI);return Math.abs(E)<n.EPSILON14&&Math.abs(t)>n.EPSILON14?n.TWO_PI:E},n.mod=function(t,E){return(t%E+E)%E},n.equalsEpsilon=function(t,e,r,n){n=E(n,r);var _=Math.abs(t-e);return n>=_||_<=r*Math.max(Math.abs(t),Math.abs(e))};var _=[1];n.factorial=function(t){var E=_.length;if(t>=E)for(var e=_[E-1],r=E;t>=r;r++)_.push(e*r);return _[t]},n.incrementWrap=function(t,e,r){return r=E(r,0),++t,t>e&&(t=r),t},n.isPowerOfTwo=function(t){return 0!==t&&0===(t&t-1)},n.nextPowerOfTwo=function(t){return--t,t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,++t,t},n.clamp=function(t,E,e){return E>t?E:t>e?e:t};var i=new t;return n.setRandomNumberSeed=function(E){i=new t(E)},n.nextRandomNumber=function(){return i.random()},n.acosClamped=function(t){return Math.acos(n.clamp(t,-1,1))},n.asinClamped=function(t){return Math.asin(n.clamp(t,-1,1))},n.chordLength=function(t,E){return 2*E*Math.sin(.5*t)},n}),define("Core/Cartesian2",["./defaultValue","./defined","./DeveloperError","./freezeObject","./Math"],function(t,E,e,r,n){"use strict";var _=function(E,e){this.x=t(E,0),this.y=t(e,0)};_.fromElements=function(t,e,r){return E(r)?(r.x=t,r.y=e,r):new _(t,e)},_.clone=function(t,e){return E(t)?E(e)?(e.x=t.x,e.y=t.y,e):new _(t.x,t.y):void 0},_.fromCartesian3=_.clone,_.fromCartesian4=_.clone,_.packedLength=2,_.pack=function(E,e,r){r=t(r,0),e[r++]=E.x,e[r]=E.y},_.unpack=function(e,r,n){return r=t(r,0),E(n)||(n=new _),n.x=e[r++],n.y=e[r],n},_.fromArray=_.unpack,_.maximumComponent=function(t){return Math.max(t.x,t.y)},_.minimumComponent=function(t){return Math.min(t.x,t.y)},_.minimumByComponent=function(t,E,e){return e.x=Math.min(t.x,E.x),e.y=Math.min(t.y,E.y),e},_.maximumByComponent=function(t,E,e){return e.x=Math.max(t.x,E.x),e.y=Math.max(t.y,E.y),e},_.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y},_.magnitude=function(t){return Math.sqrt(_.magnitudeSquared(t))};var i=new _;_.distance=function(t,E){return _.subtract(t,E,i),_.magnitude(i)},_.distanceSquared=function(t,E){return _.subtract(t,E,i),_.magnitudeSquared(i)},_.normalize=function(t,E){var e=_.magnitude(t);return E.x=t.x/e,E.y=t.y/e,E},_.dot=function(t,E){return t.x*E.x+t.y*E.y},_.multiplyComponents=function(t,E,e){return e.x=t.x*E.x,e.y=t.y*E.y,e},_.add=function(t,E,e){return e.x=t.x+E.x,e.y=t.y+E.y,e},_.subtract=function(t,E,e){return e.x=t.x-E.x,e.y=t.y-E.y,e},_.multiplyByScalar=function(t,E,e){return e.x=t.x*E,e.y=t.y*E,e},_.divideByScalar=function(t,E,e){return e.x=t.x/E,e.y=t.y/E,e},_.negate=function(t,E){return E.x=-t.x,E.y=-t.y,E},_.abs=function(t,E){return E.x=Math.abs(t.x),E.y=Math.abs(t.y),E};var R=new _;_.lerp=function(t,E,e,r){return _.multiplyByScalar(E,e,R),r=_.multiplyByScalar(t,1-e,r),_.add(R,r,r)};var T=new _,a=new _;_.angleBetween=function(t,E){return _.normalize(t,T),_.normalize(E,a),n.acosClamped(_.dot(T,a))};var o=new _;return _.mostOrthogonalAxis=function(t,E){var e=_.normalize(t,o);return _.abs(e,e),E=e.x<=e.y?_.clone(_.UNIT_X,E):_.clone(_.UNIT_Y,E)},_.equals=function(t,e){return t===e||E(t)&&E(e)&&t.x===e.x&&t.y===e.y},_.equalsArray=function(t,E,e){return t.x===E[e]&&t.y===E[e+1]},_.equalsEpsilon=function(t,e,r,_){return t===e||E(t)&&E(e)&&n.equalsEpsilon(t.x,e.x,r,_)&&n.equalsEpsilon(t.y,e.y,r,_)},_.ZERO=r(new _(0,0)),_.UNIT_X=r(new _(1,0)),_.UNIT_Y=r(new _(0,1)),_.prototype.clone=function(t){return _.clone(this,t)},_.prototype.equals=function(t){return _.equals(this,t)},_.prototype.equalsEpsilon=function(t,E,e){return _.equalsEpsilon(this,t,E,e)},_.prototype.toString=function(){return"("+this.x+", "+this.y+")"},_}),define("Core/Cartesian3",["./defaultValue","./defined","./DeveloperError","./freezeObject","./Math"],function(t,E,e,r,n){"use strict";var _=function(E,e,r){this.x=t(E,0),this.y=t(e,0),this.z=t(r,0)};_.fromSpherical=function(e,r){E(r)||(r=new _);var n=e.clock,i=e.cone,R=t(e.magnitude,1),T=R*Math.sin(i);return r.x=T*Math.cos(n),r.y=T*Math.sin(n),r.z=R*Math.cos(i),r},_.fromElements=function(t,e,r,n){return E(n)?(n.x=t,n.y=e,n.z=r,n):new _(t,e,r)},_.clone=function(t,e){return E(t)?E(e)?(e.x=t.x,e.y=t.y,e.z=t.z,e):new _(t.x,t.y,t.z):void 0},_.fromCartesian4=_.clone,_.packedLength=3,_.pack=function(E,e,r){r=t(r,0),e[r++]=E.x,e[r++]=E.y,e[r]=E.z},_.unpack=function(e,r,n){return r=t(r,0),E(n)||(n=new _),n.x=e[r++],n.y=e[r++],n.z=e[r],n},_.fromArray=_.unpack,_.maximumComponent=function(t){return Math.max(t.x,t.y,t.z)},_.minimumComponent=function(t){return Math.min(t.x,t.y,t.z)},_.minimumByComponent=function(t,E,e){return e.x=Math.min(t.x,E.x),e.y=Math.min(t.y,E.y),e.z=Math.min(t.z,E.z),e},_.maximumByComponent=function(t,E,e){return e.x=Math.max(t.x,E.x),e.y=Math.max(t.y,E.y),e.z=Math.max(t.z,E.z),e},_.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y+t.z*t.z},_.magnitude=function(t){return Math.sqrt(_.magnitudeSquared(t))};var i=new _;_.distance=function(t,E){return _.subtract(t,E,i),_.magnitude(i)},_.distanceSquared=function(t,E){return _.subtract(t,E,i),_.magnitudeSquared(i)},_.normalize=function(t,E){var e=_.magnitude(t);return E.x=t.x/e,E.y=t.y/e,E.z=t.z/e,E},_.dot=function(t,E){return t.x*E.x+t.y*E.y+t.z*E.z},_.multiplyComponents=function(t,E,e){return e.x=t.x*E.x,e.y=t.y*E.y,e.z=t.z*E.z,e},_.add=function(t,E,e){return e.x=t.x+E.x,e.y=t.y+E.y,e.z=t.z+E.z,e},_.subtract=function(t,E,e){return e.x=t.x-E.x,e.y=t.y-E.y,e.z=t.z-E.z,e},_.multiplyByScalar=function(t,E,e){return e.x=t.x*E,e.y=t.y*E,e.z=t.z*E,e},_.divideByScalar=function(t,E,e){return e.x=t.x/E,e.y=t.y/E,e.z=t.z/E,e},_.negate=function(t,E){return E.x=-t.x,E.y=-t.y,E.z=-t.z,E},_.abs=function(t,E){return E.x=Math.abs(t.x),E.y=Math.abs(t.y),E.z=Math.abs(t.z),E};var R=new _;_.lerp=function(t,E,e,r){return _.multiplyByScalar(E,e,R),r=_.multiplyByScalar(t,1-e,r),_.add(R,r,r)};var T=new _,a=new _;_.angleBetween=function(t,E){_.normalize(t,T),_.normalize(E,a);var e=_.dot(T,a),r=_.magnitude(_.cross(T,a,T));return Math.atan2(r,e)};var o=new _;_.mostOrthogonalAxis=function(t,E){var e=_.normalize(t,o);return _.abs(e,e),E=e.x<=e.y?e.x<=e.z?_.clone(_.UNIT_X,E):_.clone(_.UNIT_Z,E):e.y<=e.z?_.clone(_.UNIT_Y,E):_.clone(_.UNIT_Z,E)},_.equals=function(t,e){return t===e||E(t)&&E(e)&&t.x===e.x&&t.y===e.y&&t.z===e.z},_.equalsArray=function(t,E,e){return t.x===E[e]&&t.y===E[e+1]&&t.z===E[e+2]},_.equalsEpsilon=function(t,e,r,_){return t===e||E(t)&&E(e)&&n.equalsEpsilon(t.x,e.x,r,_)&&n.equalsEpsilon(t.y,e.y,r,_)&&n.equalsEpsilon(t.z,e.z,r,_)},_.cross=function(t,E,e){var r=t.x,n=t.y,_=t.z,i=E.x,R=E.y,T=E.z,a=n*T-_*R,o=_*i-r*T,A=r*R-n*i;return e.x=a,e.y=o,e.z=A,e},_.fromDegrees=function(t,E,e,r,i){var R=n.toRadians(t),T=n.toRadians(E);return _.fromRadians(R,T,e,r,i)};var A=new _,N=new _,u=new _(40680631590769,40680631590769,40408299984661.445);return _.fromRadians=function(e,r,n,i,R){n=t(n,0);var T=E(i)?i.radiiSquared:u,a=Math.cos(r);A.x=a*Math.cos(e),A.y=a*Math.sin(e),A.z=Math.sin(r),A=_.normalize(A,A),_.multiplyComponents(T,A,N);var o=Math.sqrt(_.dot(A,N));return N=_.divideByScalar(N,o,N),A=_.multiplyByScalar(A,n,A),E(R)||(R=new _),_.add(N,A,R)},_.fromDegreesArray=function(t,E,e){for(var r=new Array(t.length),i=0;i<t.length;i++)r[i]=n.toRadians(t[i]);return _.fromRadiansArray(r,E,e)},_.fromRadiansArray=function(t,e,r){var n=t.length;E(r)?r.length=n/2:r=new Array(n/2);for(var i=0;n>i;i+=2){var R=t[i],T=t[i+1];r[i/2]=_.fromRadians(R,T,0,e,r[i/2])}return r},_.fromDegreesArrayHeights=function(t,E,e){for(var r=new Array(t.length),i=0;i<t.length;i+=3)r[i]=n.toRadians(t[i]),r[i+1]=n.toRadians(t[i+1]),r[i+2]=t[i+2];return _.fromRadiansArrayHeights(r,E,e)},_.fromRadiansArrayHeights=function(t,e,r){var n=t.length;E(r)?r.length=n/3:r=new Array(n/3);for(var i=0;n>i;i+=3){var R=t[i],T=t[i+1],a=t[i+2];r[i/3]=_.fromRadians(R,T,a,e,r[i/3])}return r},_.ZERO=r(new _(0,0,0)),_.UNIT_X=r(new _(1,0,0)),_.UNIT_Y=r(new _(0,1,0)),_.UNIT_Z=r(new _(0,0,1)),_.prototype.clone=function(t){return _.clone(this,t)},_.prototype.equals=function(t){return _.equals(this,t)},_.prototype.equalsEpsilon=function(t,E,e){return _.equalsEpsilon(this,t,E,e)},_.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"},_}),define("Core/AttributeCompression",["./Cartesian2","./Cartesian3","./defined","./DeveloperError","./Math"],function(t,E,e,r,n){"use strict";var _={};_.octEncode=function(t,E){if(E.x=t.x/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),E.y=t.y/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),t.z<0){var e=E.x,r=E.y;E.x=(1-Math.abs(r))*n.signNotZero(e),E.y=(1-Math.abs(e))*n.signNotZero(r)}return E.x=n.toSNorm(E.x),E.y=n.toSNorm(E.y),E},_.octDecode=function(t,e,r){if(r.x=n.fromSNorm(t),r.y=n.fromSNorm(e),r.z=1-(Math.abs(r.x)+Math.abs(r.y)),r.z<0){var _=r.x;r.x=(1-Math.abs(r.y))*n.signNotZero(_),r.y=(1-Math.abs(_))*n.signNotZero(r.y)}return E.normalize(r,r)},_.octPackFloat=function(t){return 256*t.x+t.y};var i=new t;return _.octEncodeFloat=function(t){return _.octEncode(t,i),_.octPackFloat(i)},_.octDecodeFloat=function(t,E){var e=t/256,r=Math.floor(e),n=256*(e-r);return _.octDecode(r,n,E)},_.octPack=function(t,E,e,r){var n=_.octEncodeFloat(t),R=_.octEncodeFloat(E),T=_.octEncode(e,i);return r.x=65536*T.x+n,r.y=65536*T.y+R,r},_.octUnpack=function(t,E,e,r){var n=t.x/65536,i=Math.floor(n),R=65536*(n-i);n=t.y/65536;var T=Math.floor(n),a=65536*(n-T);_.octDecodeFloat(R,E),_.octDecodeFloat(a,e),_.octDecode(i,T,r)},_.compressTextureCoordinates=function(t){var E=1===t.x?4095:4096*t.x|0,e=1===t.y?4095:4096*t.y|0;return 4096*E+e},_.decompressTextureCoordinates=function(t,E){var e=t/4096;return E.x=Math.floor(e)/4096,E.y=e-Math.floor(e),E},_}),define("Core/Cartographic",["./defaultValue","./defined","./DeveloperError","./freezeObject","./Math"],function(t,E,e,r,n){"use strict";var _=function(E,e,r){this.longitude=t(E,0),this.latitude=t(e,0),this.height=t(r,0)};return _.fromRadians=function(e,r,n,i){return n=t(n,0),E(i)?(i.longitude=e,i.latitude=r,i.height=n,i):new _(e,r,n)},_.fromDegrees=function(t,E,e,r){return t=n.toRadians(t),E=n.toRadians(E),_.fromRadians(t,E,e,r)},_.clone=function(t,e){return E(t)?E(e)?(e.longitude=t.longitude,e.latitude=t.latitude,e.height=t.height,e):new _(t.longitude,t.latitude,t.height):void 0},_.equals=function(t,e){return t===e||E(t)&&E(e)&&t.longitude===e.longitude&&t.latitude===e.latitude&&t.height===e.height},_.equalsEpsilon=function(t,e,r){return t===e||E(t)&&E(e)&&Math.abs(t.longitude-e.longitude)<=r&&Math.abs(t.latitude-e.latitude)<=r&&Math.abs(t.height-e.height)<=r},_.ZERO=r(new _(0,0,0)),_.prototype.clone=function(t){return _.clone(this,t)},_.prototype.equals=function(t){return _.equals(this,t)},_.prototype.equalsEpsilon=function(t,E){return _.equalsEpsilon(this,t,E)},_.prototype.toString=function(){return"("+this.longitude+", "+this.latitude+", "+this.height+")"},_}),define("Core/defineProperties",["./defined"],function(t){"use strict";var E=function(){try{return"x"in Object.defineProperty({},"x",{})}catch(t){return!1}}(),e=Object.defineProperties;return E&&t(e)||(e=function(t){return t}),e}),define("Core/Ellipsoid",["./Cartesian3","./Cartographic","./defaultValue","./defined","./defineProperties","./DeveloperError","./freezeObject","./Math"],function(t,E,e,r,n,_,i,R){"use strict";function T(E,r,n,_){r=e(r,0),n=e(n,0),_=e(_,0),E._radii=new t(r,n,_),E._radiiSquared=new t(r*r,n*n,_*_),E._radiiToTheFourth=new t(r*r*r*r,n*n*n*n,_*_*_*_),E._oneOverRadii=new t(0===r?0:1/r,0===n?0:1/n,0===_?0:1/_),E._oneOverRadiiSquared=new t(0===r?0:1/(r*r),0===n?0:1/(n*n),0===_?0:1/(_*_)),E._minimumRadius=Math.min(r,n,_),E._maximumRadius=Math.max(r,n,_),E._centerToleranceSquared=R.EPSILON1}var a=function(t,E,e){this._radii=void 0,this._radiiSquared=void 0,this._radiiToTheFourth=void 0,this._oneOverRadii=void 0,this._oneOverRadiiSquared=void 0,this._minimumRadius=void 0,this._maximumRadius=void 0,this._centerToleranceSquared=void 0,T(this,t,E,e)};n(a.prototype,{radii:{get:function(){return this._radii}},radiiSquared:{get:function(){return this._radiiSquared}},radiiToTheFourth:{get:function(){return this._radiiToTheFourth}},oneOverRadii:{get:function(){return this._oneOverRadii}},oneOverRadiiSquared:{get:function(){return this._oneOverRadiiSquared}},minimumRadius:{get:function(){return this._minimumRadius}},maximumRadius:{get:function(){return this._maximumRadius}}}),a.clone=function(E,e){if(!r(E))return void 0;var n=E._radii;return r(e)?(t.clone(n,e._radii),t.clone(E._radiiSquared,e._radiiSquared),t.clone(E._radiiToTheFourth,e._radiiToTheFourth),t.clone(E._oneOverRadii,e._oneOverRadii),t.clone(E._oneOverRadiiSquared,e._oneOverRadiiSquared),e._minimumRadius=E._minimumRadius,e._maximumRadius=E._maximumRadius,e._centerToleranceSquared=E._centerToleranceSquared,e):new a(n.x,n.y,n.z)},a.fromCartesian3=function(t,E){return r(E)||(E=new a),r(t)?(T(E,t.x,t.y,t.z),E):E},a.WGS84=i(new a(6378137,6378137,6356752.314245179)),a.UNIT_SPHERE=i(new a(1,1,1)),a.MOON=i(new a(R.LUNAR_RADIUS,R.LUNAR_RADIUS,R.LUNAR_RADIUS)),a.prototype.clone=function(t){return a.clone(this,t)},a.packedLength=t.packedLength,a.pack=function(E,r,n){n=e(n,0),t.pack(E._radii,r,n)},a.unpack=function(E,r,n){r=e(r,0);var _=t.unpack(E,r);return a.fromCartesian3(_,n)},a.prototype.geocentricSurfaceNormal=t.normalize,a.prototype.geodeticSurfaceNormalCartographic=function(E,e){var n=E.longitude,_=E.latitude,i=Math.cos(_),R=i*Math.cos(n),T=i*Math.sin(n),a=Math.sin(_);return r(e)||(e=new t),e.x=R,e.y=T,e.z=a,t.normalize(e,e)},a.prototype.geodeticSurfaceNormal=function(E,e){return r(e)||(e=new t),e=t.multiplyComponents(E,this._oneOverRadiiSquared,e),t.normalize(e,e)};var o=new t,A=new t;a.prototype.cartographicToCartesian=function(E,e){var n=o,_=A;this.geodeticSurfaceNormalCartographic(E,n),t.multiplyComponents(this._radiiSquared,n,_);var i=Math.sqrt(t.dot(n,_));return t.divideByScalar(_,i,_),t.multiplyByScalar(n,E.height,n),r(e)||(e=new t),t.add(_,n,e)},a.prototype.cartographicArrayToCartesianArray=function(t,E){var e=t.length;r(E)?E.length=e:E=new Array(e);for(var n=0;e>n;n++)E[n]=this.cartographicToCartesian(t[n],E[n]);return E};var N=new t,u=new t,I=new t;a.prototype.cartesianToCartographic=function(e,n){var _=this.scaleToGeodeticSurface(e,u);if(!r(_))return void 0;var i=this.geodeticSurfaceNormal(_,N),T=t.subtract(e,_,I),a=Math.atan2(i.y,i.x),o=Math.asin(i.z),A=R.sign(t.dot(T,e))*t.magnitude(T);return r(n)?(n.longitude=a,n.latitude=o,n.height=A,n):new E(a,o,A)},a.prototype.cartesianArrayToCartographicArray=function(t,E){var e=t.length;r(E)?E.length=e:E=new Array(e);for(var n=0;e>n;++n)E[n]=this.cartesianToCartographic(t[n],E[n]);return E};var S=new t,s=new t;return a.prototype.scaleToGeodeticSurface=function(E,e){var n=E.x,_=E.y,i=E.z,T=this._oneOverRadii,a=T.x,o=T.y,A=T.z,N=n*n*a*a,u=_*_*o*o,I=i*i*A*A,M=N+u+I,c=Math.sqrt(1/M),O=t.multiplyByScalar(E,c,S);if(M<this._centerToleranceSquared)return isFinite(c)?t.clone(O,e):void 0;var C=this._oneOverRadiiSquared,F=C.x,U=C.y,h=C.z,d=s;d.x=O.x*F*2,d.y=O.y*U*2,d.z=O.z*h*2;var L,D,f,P,B,l,m,y,G,p,x,X=(1-c)*t.magnitude(E)/(.5*t.magnitude(d)),g=0;do{X-=g,f=1/(1+X*F),P=1/(1+X*U),B=1/(1+X*h),l=f*f,m=P*P,y=B*B,G=l*f,p=m*P,x=y*B,L=N*l+u*m+I*y-1,D=N*G*F+u*p*U+I*x*h;var v=-2*D;g=L/v}while(Math.abs(L)>R.EPSILON12);return r(e)?(e.x=n*f,e.y=_*P,e.z=i*B,e):new t(n*f,_*P,i*B)},a.prototype.scaleToGeocentricSurface=function(E,e){r(e)||(e=new t);var n=E.x,_=E.y,i=E.z,R=this._oneOverRadiiSquared,T=1/Math.sqrt(n*n*R.x+_*_*R.y+i*i*R.z);return t.multiplyByScalar(E,T,e)},a.prototype.transformPositionToScaledSpace=function(E,e){return r(e)||(e=new t),t.multiplyComponents(E,this._oneOverRadii,e)},a.prototype.transformPositionFromScaledSpace=function(E,e){return r(e)||(e=new t),t.multiplyComponents(E,this._radii,e)},a.prototype.equals=function(E){return this===E||r(E)&&t.equals(this._radii,E._radii)},a.prototype.toString=function(){return this._radii.toString()},a}),define("Renderer/WebGLConstants",["../Core/freezeObject"],function(t){"use strict";var E={DEPTH_BUFFER_BIT:256,STENCIL_BUFFER_BIT:1024,COLOR_BUFFER_BIT:16384,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,ZERO:0,ONE:1,SRC_COLOR:768,ONE_MINUS_SRC_COLOR:769,SRC_ALPHA:770,ONE_MINUS_SRC_ALPHA:771,DST_ALPHA:772,ONE_MINUS_DST_ALPHA:773,DST_COLOR:774,ONE_MINUS_DST_COLOR:775,SRC_ALPHA_SATURATE:776,FUNC_ADD:32774,BLEND_EQUATION:32777,BLEND_EQUATION_RGB:32777,BLEND_EQUATION_ALPHA:34877,FUNC_SUBTRACT:32778,FUNC_REVERSE_SUBTRACT:32779,BLEND_DST_RGB:32968,BLEND_SRC_RGB:32969,BLEND_DST_ALPHA:32970,BLEND_SRC_ALPHA:32971,CONSTANT_COLOR:32769,ONE_MINUS_CONSTANT_COLOR:32770,CONSTANT_ALPHA:32771,ONE_MINUS_CONSTANT_ALPHA:32772,BLEND_COLOR:32773,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,ARRAY_BUFFER_BINDING:34964,ELEMENT_ARRAY_BUFFER_BINDING:34965,STREAM_DRAW:35040,STATIC_DRAW:35044,DYNAMIC_DRAW:35048,BUFFER_SIZE:34660,BUFFER_USAGE:34661,CURRENT_VERTEX_ATTRIB:34342,FRONT:1028,BACK:1029,FRONT_AND_BACK:1032,CULL_FACE:2884,BLEND:3042,DITHER:3024,STENCIL_TEST:2960,DEPTH_TEST:2929,SCISSOR_TEST:3089,POLYGON_OFFSET_FILL:32823,SAMPLE_ALPHA_TO_COVERAGE:32926,SAMPLE_COVERAGE:32928,NO_ERROR:0,INVALID_ENUM:1280,INVALID_VALUE:1281,INVALID_OPERATION:1282,OUT_OF_MEMORY:1285,CW:2304,CCW:2305,LINE_WIDTH:2849,ALIASED_POINT_SIZE_RANGE:33901,ALIASED_LINE_WIDTH_RANGE:33902,CULL_FACE_MODE:2885,FRONT_FACE:2886,DEPTH_RANGE:2928,DEPTH_WRITEMASK:2930,DEPTH_CLEAR_VALUE:2931,DEPTH_FUNC:2932,STENCIL_CLEAR_VALUE:2961,STENCIL_FUNC:2962,STENCIL_FAIL:2964,STENCIL_PASS_DEPTH_FAIL:2965,STENCIL_PASS_DEPTH_PASS:2966,STENCIL_REF:2967,STENCIL_VALUE_MASK:2963,STENCIL_WRITEMASK:2968,STENCIL_BACK_FUNC:34816,STENCIL_BACK_FAIL:34817,STENCIL_BACK_PASS_DEPTH_FAIL:34818,STENCIL_BACK_PASS_DEPTH_PASS:34819,STENCIL_BACK_REF:36003,STENCIL_BACK_VALUE_MASK:36004,STENCIL_BACK_WRITEMASK:36005,VIEWPORT:2978,SCISSOR_BOX:3088,COLOR_CLEAR_VALUE:3106,COLOR_WRITEMASK:3107,UNPACK_ALIGNMENT:3317,PACK_ALIGNMENT:3333,MAX_TEXTURE_SIZE:3379,MAX_VIEWPORT_DIMS:3386,SUBPIXEL_BITS:3408,RED_BITS:3410,GREEN_BITS:3411,BLUE_BITS:3412,ALPHA_BITS:3413,DEPTH_BITS:3414,STENCIL_BITS:3415,POLYGON_OFFSET_UNITS:10752,POLYGON_OFFSET_FACTOR:32824,TEXTURE_BINDING_2D:32873,SAMPLE_BUFFERS:32936,SAMPLES:32937,SAMPLE_COVERAGE_VALUE:32938,SAMPLE_COVERAGE_INVERT:32939,COMPRESSED_TEXTURE_FORMATS:34467,DONT_CARE:4352,FASTEST:4353,NICEST:4354,GENERATE_MIPMAP_HINT:33170,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,DEPTH_COMPONENT:6402,ALPHA:6406,RGB:6407,RGBA:6408,LUMINANCE:6409,LUMINANCE_ALPHA:6410,UNSIGNED_SHORT_4_4_4_4:32819,UNSIGNED_SHORT_5_5_5_1:32820,UNSIGNED_SHORT_5_6_5:33635,FRAGMENT_SHADER:35632,VERTEX_SHADER:35633,MAX_VERTEX_ATTRIBS:34921,MAX_VERTEX_UNIFORM_VECTORS:36347,MAX_VARYING_VECTORS:36348,MAX_COMBINED_TEXTURE_IMAGE_UNITS:35661,MAX_VERTEX_TEXTURE_IMAGE_UNITS:35660,MAX_TEXTURE_IMAGE_UNITS:34930,MAX_FRAGMENT_UNIFORM_VECTORS:36349,SHADER_TYPE:35663,DELETE_STATUS:35712,LINK_STATUS:35714,VALIDATE_STATUS:35715,ATTACHED_SHADERS:35717,ACTIVE_UNIFORMS:35718,ACTIVE_ATTRIBUTES:35721,SHADING_LANGUAGE_VERSION:35724,CURRENT_PROGRAM:35725,NEVER:512,LESS:513,EQUAL:514,LEQUAL:515,GREATER:516,NOTEQUAL:517,GEQUAL:518,ALWAYS:519,KEEP:7680,REPLACE:7681,INCR:7682,DECR:7683,INVERT:5386,INCR_WRAP:34055,DECR_WRAP:34056,VENDOR:7936,RENDERER:7937,VERSION:7938,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,TEXTURE_MAG_FILTER:10240,TEXTURE_MIN_FILTER:10241,TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,TEXTURE_2D:3553,TEXTURE:5890,TEXTURE_CUBE_MAP:34067,TEXTURE_BINDING_CUBE_MAP:34068,TEXTURE_CUBE_MAP_POSITIVE_X:34069,TEXTURE_CUBE_MAP_NEGATIVE_X:34070,TEXTURE_CUBE_MAP_POSITIVE_Y:34071,TEXTURE_CUBE_MAP_NEGATIVE_Y:34072,TEXTURE_CUBE_MAP_POSITIVE_Z:34073,TEXTURE_CUBE_MAP_NEGATIVE_Z:34074,MAX_CUBE_MAP_TEXTURE_SIZE:34076,TEXTURE0:33984,TEXTURE1:33985,TEXTURE2:33986,TEXTURE3:33987,TEXTURE4:33988,TEXTURE5:33989,TEXTURE6:33990,TEXTURE7:33991,TEXTURE8:33992,TEXTURE9:33993,TEXTURE10:33994,TEXTURE11:33995,TEXTURE12:33996,TEXTURE13:33997,TEXTURE14:33998,TEXTURE15:33999,TEXTURE16:34e3,TEXTURE17:34001,TEXTURE18:34002,TEXTURE19:34003,TEXTURE20:34004,TEXTURE21:34005,TEXTURE22:34006,TEXTURE23:34007,TEXTURE24:34008,TEXTURE25:34009,TEXTURE26:34010,TEXTURE27:34011,TEXTURE28:34012,TEXTURE29:34013,TEXTURE30:34014,TEXTURE31:34015,ACTIVE_TEXTURE:34016,REPEAT:10497,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,INT_VEC2:35667,INT_VEC3:35668,INT_VEC4:35669,BOOL:35670,BOOL_VEC2:35671,BOOL_VEC3:35672,BOOL_VEC4:35673,FLOAT_MAT2:35674,FLOAT_MAT3:35675,FLOAT_MAT4:35676,SAMPLER_2D:35678,SAMPLER_CUBE:35680,VERTEX_ATTRIB_ARRAY_ENABLED:34338,VERTEX_ATTRIB_ARRAY_SIZE:34339,VERTEX_ATTRIB_ARRAY_STRIDE:34340,VERTEX_ATTRIB_ARRAY_TYPE:34341,VERTEX_ATTRIB_ARRAY_NORMALIZED:34922,VERTEX_ATTRIB_ARRAY_POINTER:34373,VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:34975,IMPLEMENTATION_COLOR_READ_TYPE:35738,IMPLEMENTATION_COLOR_READ_FORMAT:35739,COMPILE_STATUS:35713,LOW_FLOAT:36336,MEDIUM_FLOAT:36337,HIGH_FLOAT:36338,LOW_INT:36339,MEDIUM_INT:36340,HIGH_INT:36341,FRAMEBUFFER:36160,RENDERBUFFER:36161,RGBA4:32854,RGB5_A1:32855,RGB565:36194,DEPTH_COMPONENT16:33189,STENCIL_INDEX:6401,STENCIL_INDEX8:36168,DEPTH_STENCIL:34041,RENDERBUFFER_WIDTH:36162,RENDERBUFFER_HEIGHT:36163,RENDERBUFFER_INTERNAL_FORMAT:36164,RENDERBUFFER_RED_SIZE:36176,RENDERBUFFER_GREEN_SIZE:36177,RENDERBUFFER_BLUE_SIZE:36178,RENDERBUFFER_ALPHA_SIZE:36179,RENDERBUFFER_DEPTH_SIZE:36180,RENDERBUFFER_STENCIL_SIZE:36181,FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE:36048,FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:36049,FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL:36050,FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE:36051,COLOR_ATTACHMENT0:36064,DEPTH_ATTACHMENT:36096,STENCIL_ATTACHMENT:36128,DEPTH_STENCIL_ATTACHMENT:33306,NONE:0,FRAMEBUFFER_COMPLETE:36053,FRAMEBUFFER_INCOMPLETE_ATTACHMENT:36054,FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:36055,FRAMEBUFFER_INCOMPLETE_DIMENSIONS:36057,FRAMEBUFFER_UNSUPPORTED:36061,FRAMEBUFFER_BINDING:36006,RENDERBUFFER_BINDING:36007,MAX_RENDERBUFFER_SIZE:34024,INVALID_FRAMEBUFFER_OPERATION:1286,UNPACK_FLIP_Y_WEBGL:37440,UNPACK_PREMULTIPLY_ALPHA_WEBGL:37441,CONTEXT_LOST_WEBGL:37442,UNPACK_COLORSPACE_CONVERSION_WEBGL:37443,BROWSER_DEFAULT_WEBGL:37444,DOUBLE:5130,READ_BUFFER:3074,UNPACK_ROW_LENGTH:3314,UNPACK_SKIP_ROWS:3315,UNPACK_SKIP_PIXELS:3316,PACK_ROW_LENGTH:3330,PACK_SKIP_ROWS:3331,PACK_SKIP_PIXELS:3332,COLOR:6144,DEPTH:6145,STENCIL:6146,RED:6403,RGB8:32849,RGBA8:32856,RGB10_A2:32857,TEXTURE_BINDING_3D:32874,UNPACK_SKIP_IMAGES:32877,UNPACK_IMAGE_HEIGHT:32878,TEXTURE_3D:32879,TEXTURE_WRAP_R:32882,MAX_3D_TEXTURE_SIZE:32883,UNSIGNED_INT_2_10_10_10_REV:33640,MAX_ELEMENTS_VERTICES:33e3,MAX_ELEMENTS_INDICES:33001,TEXTURE_MIN_LOD:33082,TEXTURE_MAX_LOD:33083,TEXTURE_BASE_LEVEL:33084,TEXTURE_MAX_LEVEL:33085,MIN:32775,MAX:32776,DEPTH_COMPONENT24:33190,MAX_TEXTURE_LOD_BIAS:34045,TEXTURE_COMPARE_MODE:34892,TEXTURE_COMPARE_FUNC:34893,CURRENT_QUERY:34917,QUERY_RESULT:34918,QUERY_RESULT_AVAILABLE:34919,STREAM_READ:35041,STREAM_COPY:35042,STATIC_READ:35045,STATIC_COPY:35046,DYNAMIC_READ:35049,DYNAMIC_COPY:35050,MAX_DRAW_BUFFERS:34852,DRAW_BUFFER0:34853,DRAW_BUFFER1:34854,DRAW_BUFFER2:34855,DRAW_BUFFER3:34856,DRAW_BUFFER4:34857,DRAW_BUFFER5:34858,DRAW_BUFFER6:34859,DRAW_BUFFER7:34860,DRAW_BUFFER8:34861,DRAW_BUFFER9:34862,DRAW_BUFFER10:34863,DRAW_BUFFER11:34864,DRAW_BUFFER12:34865,DRAW_BUFFER13:34866,DRAW_BUFFER14:34867,DRAW_BUFFER15:34868,MAX_FRAGMENT_UNIFORM_COMPONENTS:35657,MAX_VERTEX_UNIFORM_COMPONENTS:35658,SAMPLER_3D:35679,SAMPLER_2D_SHADOW:35682,FRAGMENT_SHADER_DERIVATIVE_HINT:35723,PIXEL_PACK_BUFFER:35051,PIXEL_UNPACK_BUFFER:35052,PIXEL_PACK_BUFFER_BINDING:35053,PIXEL_UNPACK_BUFFER_BINDING:35055,FLOAT_MAT2x3:35685,FLOAT_MAT2x4:35686,FLOAT_MAT3x2:35687,FLOAT_MAT3x4:35688,FLOAT_MAT4x2:35689,FLOAT_MAT4x3:35690,SRGB:35904,SRGB8:35905,SRGB8_ALPHA8:35907,COMPARE_REF_TO_TEXTURE:34894,RGBA32F:34836,RGB32F:34837,RGBA16F:34842,RGB16F:34843,VERTEX_ATTRIB_ARRAY_INTEGER:35069,MAX_ARRAY_TEXTURE_LAYERS:35071,MIN_PROGRAM_TEXEL_OFFSET:35076,MAX_PROGRAM_TEXEL_OFFSET:35077,MAX_VARYING_COMPONENTS:35659,TEXTURE_2D_ARRAY:35866,TEXTURE_BINDING_2D_ARRAY:35869,R11F_G11F_B10F:35898,UNSIGNED_INT_10F_11F_11F_REV:35899,RGB9_E5:35901,UNSIGNED_INT_5_9_9_9_REV:35902,TRANSFORM_FEEDBACK_BUFFER_MODE:35967,MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS:35968,TRANSFORM_FEEDBACK_VARYINGS:35971,TRANSFORM_FEEDBACK_BUFFER_START:35972,TRANSFORM_FEEDBACK_BUFFER_SIZE:35973,TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN:35976,RASTERIZER_DISCARD:35977,MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS:35978,MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS:35979,INTERLEAVED_ATTRIBS:35980,SEPARATE_ATTRIBS:35981,TRANSFORM_FEEDBACK_BUFFER:35982,TRANSFORM_FEEDBACK_BUFFER_BINDING:35983,RGBA32UI:36208,RGB32UI:36209,RGBA16UI:36214,RGB16UI:36215,RGBA8UI:36220,RGB8UI:36221,RGBA32I:36226,RGB32I:36227,RGBA16I:36232,RGB16I:36233,RGBA8I:36238,RGB8I:36239,RED_INTEGER:36244,RGB_INTEGER:36248,RGBA_INTEGER:36249,SAMPLER_2D_ARRAY:36289,SAMPLER_2D_ARRAY_SHADOW:36292,SAMPLER_CUBE_SHADOW:36293,UNSIGNED_INT_VEC2:36294,UNSIGNED_INT_VEC3:36295,UNSIGNED_INT_VEC4:36296,INT_SAMPLER_2D:36298,INT_SAMPLER_3D:36299,INT_SAMPLER_CUBE:36300,INT_SAMPLER_2D_ARRAY:36303,UNSIGNED_INT_SAMPLER_2D:36306,UNSIGNED_INT_SAMPLER_3D:36307,UNSIGNED_INT_SAMPLER_CUBE:36308,UNSIGNED_INT_SAMPLER_2D_ARRAY:36311,DEPTH_COMPONENT32F:36012,DEPTH32F_STENCIL8:36013,FLOAT_32_UNSIGNED_INT_24_8_REV:36269,FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING:33296,FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE:33297,FRAMEBUFFER_ATTACHMENT_RED_SIZE:33298,FRAMEBUFFER_ATTACHMENT_GREEN_SIZE:33299,FRAMEBUFFER_ATTACHMENT_BLUE_SIZE:33300,FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE:33301,FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE:33302,FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE:33303,FRAMEBUFFER_DEFAULT:33304,UNSIGNED_INT_24_8:34042,DEPTH24_STENCIL8:35056,UNSIGNED_NORMALIZED:35863,DRAW_FRAMEBUFFER_BINDING:36006,READ_FRAMEBUFFER:36008,DRAW_FRAMEBUFFER:36009,READ_FRAMEBUFFER_BINDING:36010,RENDERBUFFER_SAMPLES:36011,FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER:36052,MAX_COLOR_ATTACHMENTS:36063,COLOR_ATTACHMENT1:36065,COLOR_ATTACHMENT2:36066,COLOR_ATTACHMENT3:36067,COLOR_ATTACHMENT4:36068,COLOR_ATTACHMENT5:36069,COLOR_ATTACHMENT6:36070,COLOR_ATTACHMENT7:36071,COLOR_ATTACHMENT8:36072,COLOR_ATTACHMENT9:36073,COLOR_ATTACHMENT10:36074,COLOR_ATTACHMENT11:36075,COLOR_ATTACHMENT12:36076,COLOR_ATTACHMENT13:36077,COLOR_ATTACHMENT14:36078,COLOR_ATTACHMENT15:36079,FRAMEBUFFER_INCOMPLETE_MULTISAMPLE:36182,MAX_SAMPLES:36183,HALF_FLOAT:5131,RG:33319,RG_INTEGER:33320,R8:33321,RG8:33323,R16F:33325,R32F:33326,RG16F:33327,RG32F:33328,R8I:33329,R8UI:33330,R16I:33331,R16UI:33332,R32I:33333,R32UI:33334,RG8I:33335,RG8UI:33336,RG16I:33337,RG16UI:33338,RG32I:33339,RG32UI:33340,VERTEX_ARRAY_BINDING:34229,R8_SNORM:36756,RG8_SNORM:36757,RGB8_SNORM:36758,RGBA8_SNORM:36759,SIGNED_NORMALIZED:36764,COPY_READ_BUFFER:36662,COPY_WRITE_BUFFER:36663,COPY_READ_BUFFER_BINDING:36662,COPY_WRITE_BUFFER_BINDING:36663,UNIFORM_BUFFER:35345,UNIFORM_BUFFER_BINDING:35368,UNIFORM_BUFFER_START:35369,UNIFORM_BUFFER_SIZE:35370,MAX_VERTEX_UNIFORM_BLOCKS:35371,MAX_FRAGMENT_UNIFORM_BLOCKS:35373,MAX_COMBINED_UNIFORM_BLOCKS:35374,MAX_UNIFORM_BUFFER_BINDINGS:35375,MAX_UNIFORM_BLOCK_SIZE:35376,MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS:35377,MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS:35379,UNIFORM_BUFFER_OFFSET_ALIGNMENT:35380,ACTIVE_UNIFORM_BLOCKS:35382,UNIFORM_TYPE:35383,UNIFORM_SIZE:35384,UNIFORM_BLOCK_INDEX:35386,UNIFORM_OFFSET:35387,UNIFORM_ARRAY_STRIDE:35388,UNIFORM_MATRIX_STRIDE:35389,UNIFORM_IS_ROW_MAJOR:35390,UNIFORM_BLOCK_BINDING:35391,UNIFORM_BLOCK_DATA_SIZE:35392,UNIFORM_BLOCK_ACTIVE_UNIFORMS:35394,UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES:35395,UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER:35396,UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER:35398,INVALID_INDEX:4294967295,MAX_VERTEX_OUTPUT_COMPONENTS:37154,MAX_FRAGMENT_INPUT_COMPONENTS:37157,MAX_SERVER_WAIT_TIMEOUT:37137,OBJECT_TYPE:37138,SYNC_CONDITION:37139,SYNC_STATUS:37140,SYNC_FLAGS:37141,SYNC_FENCE:37142,SYNC_GPU_COMMANDS_COMPLETE:37143,UNSIGNALED:37144,SIGNALED:37145,ALREADY_SIGNALED:37146,TIMEOUT_EXPIRED:37147,CONDITION_SATISFIED:37148,WAIT_FAILED:37149,SYNC_FLUSH_COMMANDS_BIT:1,VERTEX_ATTRIB_ARRAY_DIVISOR:35070,ANY_SAMPLES_PASSED:35887,ANY_SAMPLES_PASSED_CONSERVATIVE:36202,SAMPLER_BINDING:35097,RGB10_A2UI:36975,INT_2_10_10_10_REV:36255,TRANSFORM_FEEDBACK:36386,TRANSFORM_FEEDBACK_PAUSED:36387,TRANSFORM_FEEDBACK_ACTIVE:36388,TRANSFORM_FEEDBACK_BINDING:36389,
COMPRESSED_R11_EAC:37488,COMPRESSED_SIGNED_R11_EAC:37489,COMPRESSED_RG11_EAC:37490,COMPRESSED_SIGNED_RG11_EAC:37491,COMPRESSED_RGB8_ETC2:37492,COMPRESSED_SRGB8_ETC2:37493,COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:37494,COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:37495,COMPRESSED_RGBA8_ETC2_EAC:37496,COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:37497,TEXTURE_IMMUTABLE_FORMAT:37167,MAX_ELEMENT_INDEX:36203,TEXTURE_IMMUTABLE_LEVELS:33503};return t(E)}),define("Core/IndexDatatype",["../Renderer/WebGLConstants","./defined","./DeveloperError","./freezeObject","./Math"],function(t,E,e,r,n){"use strict";var _={UNSIGNED_BYTE:t.UNSIGNED_BYTE,UNSIGNED_SHORT:t.UNSIGNED_SHORT,UNSIGNED_INT:t.UNSIGNED_INT};return _.getSizeInBytes=function(t){switch(t){case _.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case _.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case _.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}},_.validate=function(t){return E(t)&&(t===_.UNSIGNED_BYTE||t===_.UNSIGNED_SHORT||t===_.UNSIGNED_INT)},_.createTypedArray=function(t,E){return t>=n.SIXTY_FOUR_KILOBYTES?new Uint32Array(E):new Uint16Array(E)},_.createTypedArrayFromArrayBuffer=function(t,E,e,r){return t>=n.SIXTY_FOUR_KILOBYTES?new Uint32Array(E,e,r):new Uint16Array(E,e,r)},r(_)}),define("Core/formatError",["./defined"],function(t){"use strict";var E=function(E){var e,r=E.name,n=E.message;e=t(r)&&t(n)?r+": "+n:E.toString();var _=E.stack;return t(_)&&(e+="\n"+_),e};return E}),define("Workers/createTaskProcessorWorker",["../Core/defaultValue","../Core/defined","../Core/formatError"],function(t,E,e){"use strict";var r=function(r){var n,_=[],i={id:void 0,result:void 0,error:void 0};return function(R){var T=R.data;_.length=0,i.id=T.id,i.error=void 0,i.result=void 0;try{i.result=r(T.parameters,_)}catch(a){a instanceof Error?i.error={name:a.name,message:a.message,stack:a.stack}:i.error=a}E(n)||(n=t(self.webkitPostMessage,self.postMessage)),T.canTransferArrayBuffer||(_.length=0);try{n(i,_)}catch(a){i.result=void 0,i.error="postMessage failed with error: "+e(a)+"\n  with responseMessage: "+JSON.stringify(i),n(i)}}};return r}),define("Workers/createVerticesFromQuantizedTerrainMesh",["../Core/AttributeCompression","../Core/Cartesian2","../Core/Cartesian3","../Core/Cartographic","../Core/defined","../Core/Ellipsoid","../Core/IndexDatatype","../Core/Math","./createTaskProcessorWorker"],function(t,E,e,r,n,_,i,R,T){"use strict";function a(E,e){var r=E.quantizedVertices,T=r.length/3,a=E.octEncodedNormals,U=E.westIndices.length+E.eastIndices.length+E.southIndices.length+E.northIndices.length,h=E.minimumHeight,d=E.maximumHeight,L=E.relativeToCenter,D=E.rectangle,f=D.west,P=D.south,B=D.east,l=D.north,m=_.clone(E.ellipsoid),y=r.subarray(0,T),G=r.subarray(T,2*T),p=r.subarray(2*T,3*T),x=n(a),X=6;x&&(X+=1);for(var g=new Float32Array(T*X+U*X),v=0,H=0,V=0;T>v;++v,H+=X,V+=2){var w=y[v]/A,z=G[v]/A,Y=R.lerp(h,d,p[v]/A);C.longitude=R.lerp(f,B,w),C.latitude=R.lerp(P,l,z),C.height=Y,m.cartographicToCartesian(C,O),g[H+N]=O.x-L.x,g[H+u]=O.y-L.y,g[H+I]=O.z-L.z,g[H+S]=Y,g[H+s]=w,g[H+M]=z,x&&(F.x=a[V],F.y=a[V+1],g[H+c]=t.octPackFloat(F))}var W=Math.max(0,2*(U-4)),K=E.indices.length+3*W,q=i.createTypedArray(T+U,K);q.set(E.indices,0);var b=T*X,Z=E.indices.length;return Z=o(g,b,q,Z,E.westIndices,L,m,D,E.westSkirtHeight,!0,x),b+=E.westIndices.length*X,Z=o(g,b,q,Z,E.southIndices,L,m,D,E.southSkirtHeight,!1,x),b+=E.southIndices.length*X,Z=o(g,b,q,Z,E.eastIndices,L,m,D,E.eastSkirtHeight,!1,x),b+=E.eastIndices.length*X,Z=o(g,b,q,Z,E.northIndices,L,m,D,E.northSkirtHeight,!0,x),b+=E.northIndices.length*X,e.push(g.buffer,q.buffer),{vertices:g.buffer,indices:q.buffer}}function o(t,E,r,n,_,i,T,a,o,A,N){var u,I,F,U=6;N&&(U+=1),A?(u=_.length-1,I=-1,F=-1):(u=0,I=_.length,F=1);var h=-1,d=E/U,L=a.north,D=a.south,f=a.east,P=a.west;P>f&&(f+=R.TWO_PI);for(var B=u;B!==I;B+=F){var l=_[B],m=l*U,y=t[m+s],G=t[m+M],p=t[m+S];C.longitude=R.lerp(P,f,y),C.latitude=R.lerp(D,L,G),C.height=p-o;var x=T.cartographicToCartesian(C,O);e.subtract(x,i,x),t[E++]=x.x,t[E++]=x.y,t[E++]=x.z,t[E++]=C.height,t[E++]=y,t[E++]=G,N&&(t[E++]=t[m+c]),-1!==h&&(r[n++]=h,r[n++]=d-1,r[n++]=l,r[n++]=d-1,r[n++]=d,r[n++]=l),h=l,++d}return n}var A=32767,N=0,u=1,I=2,S=3,s=4,M=5,c=6,O=new e,C=new r,F=new E;return T(a)})}();