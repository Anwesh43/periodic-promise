class ContinuousPromise {

	constructor(cb) {
		this.executionFn = cb
		this.successQueue = []
		this.errorQueue = []
		this.call()
	}

	then(cb) {
		this.successCb = cb 
		this.successQueue.forEach((elem) => {
			this.successCb(elem)
		})
		return this
	}

	resolve(data) {
		if (typeof(this.successCb) === "function") {
			this.successCb(data)
		}
	}

	reject(data) {
		if (typeof(this.errorCb) === "function") {
			this.errorCb(data)
		}
	}

	catch(cb) {
		this.errorCb = cb 
		this.errorQueue.forEach((errorElem) => {
			this.errorCb(errorElem)
		})
	}

	call() {
		this.executionFn((data)=>{
			this.resolve(data)
		}, (data) => {
			this.reject(data)
		})
	} 


}
const getContinuousPromise = (delay) => {
	return new ContinuousPromise((resolve, reject) => {
		var i = 0
		setInterval(() => {
			resolve(++i)
		}, delay)
	})
}

const createContinuousPromise = (delay, cb, errcb) => {
	getContinuousPromise(delay).then((data) => {
		cb(data)
	}).catch((err) => {
		if (typeof(errcb) === "function") {
			errcb(err)
		}
	})
}
