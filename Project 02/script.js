const questionData = {
	scene: {
		question: "What do you want to use the scheme for?",
		answer: ["Application", "Study"],
		func: function (that, result) {
			// that: the clicked button (with its value: that.value)
			// result:
			if (that.value == "Application") {
				// hide button (choices)
				that.parentNode.style.display = "none"
				// show choosen result prompt
				that.parentNode.previousSibling.querySelector(".result").style.display = "block"
				creationQuestion(questionData["device"], that.value)
			} else {
				let result = document.createElement("p")
				result.innerHTML = "We recommend you choosing DES"
				main.appendChild(result)
			}
		}
	},
	device: {
		question: "What device are you planning to use?",
		answer: ["Normal Device", "Resource Constrained Device"],
		func: function (that, result) {
			if (that.value == "Normal Device") {
				that.parentNode.style.display = "none"
				that.parentNode.previousSibling.querySelector(".result").style.display = "block"
				creationQuestion(questionData["feature"], that.value)
			} else {
				let result = document.createElement("p")
				result.innerHTML = "We recommend you choosing SIMON"
				main.appendChild(result)
			}
		}
	},
	feature: {
		question: "What feature(s) is(are) the most important to you?",
		answer: ["Security", "Efficiency", "Security And Efficiency"],
		func: function (that, result) {
			if (that.value == "Security And Efficiency") {
				that.parentNode.style.display = "none"
				that.parentNode.previousSibling.querySelector(".result").style.display = "block"
				creationQuestion(questionData["stream"], "Both")
			} else {
				that.parentNode.style.display = "none"
				that.parentNode.previousSibling.querySelector(".result").style.display = "block"
				creationQuestion(questionData["hash"], that.value)
			}
		}
	},
	hash: {
		question: "Do you need this scheme to work with hash function?",
		answer: ["YES", "NO", "I'm Not Sure"],
		func: function (that, result) {
			// come from feature needs security only
			if (result == "Security") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing IDEA-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["stream"], "Security")
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["stream"], "Efficiency")
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-OFB"
					main.appendChild(result)
				} else {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES"
					main.appendChild(result)
				}
			}
		}
	},
	stream: {
		question: "Do you need this scheme to encrypt streaming data?",
		answer: ["YES", "NO"],
		func: function (that, result) {
			if (result == "Security") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing 3DES-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["photo"], "Security")
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing BF-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["photo"], "Efficiency")
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-OFB"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["photo"], "Both")
				}
			}
		}
	},
	photo: {
		question: "Do you need this scheme to encrypt photo?",
		answer: ["YES", "NO"],
		func: function (that, result) {
			if (result == "Security") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing 3DES-CBC"
					main.appendChild(result)
				} else {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing 3DES"
					main.appendChild(result)
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing BF-CBC"
					main.appendChild(result)
				} else {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing BF"
					main.appendChild(result)
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let result = document.createElement("p")
					result.innerHTML = "We recommend you choosing AES-CBC"
					main.appendChild(result)
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["hash"], "Both")
				}
			}
		}
	}
}

var currentIndex = 0

// main questions section
const main = document.querySelector(".main")

function creationQuestion(currentQuestion, result) {
	// question wrapper
	let questionWrapper = document.createElement("div")
	questionWrapper.className = "question-wrapper"
	questionWrapper.setAttribute("index", currentIndex)
	currentIndex++

	// qhead
	let qhead = document.createElement("div")
	qhead.className = "qhead"

	// actual question h4
	let h4 = document.createElement("h4")
	h4.className = "question"
	h4.innerHTML = currentQuestion.question
	qhead.appendChild(h4)

	// result button
	let resultWrapper = document.createElement("div")
	resultWrapper.className = "result"
	let resultButton = document.createElement("button")
	let span = document.createElement("span")
	span.innerHTML = "Click to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;change"
	resultButton.addEventListener("click", function () {
		this.parentNode.parentNode.parentNode.className = "question-wrapper"
		// remove all the questions after current question
		let questions = document.querySelectorAll(".question-wrapper")
		index = Number(this.parentNode.parentNode.parentNode.getAttribute("index")) + 1
		for (i = index; i < currentIndex; i++) {
			questions[i].remove()
		}
		currentIndex = index
		// hide result & show choice again
		this.parentNode.style.display = "none"
		this.parentNode.parentNode.nextSibling.style.display = "block"

		// current button's question's offset top
		let currentOffsetTop = this.parentNode.parentNode.parentNode.offsetTop
		// window height
		let windowHeight = window.innerHeight
		// optimal height
		let optimalHeight = Math.floor(windowHeight / 2 - 100)

		// if new question is too low in window, adjust window position
		if (currentOffsetTop < optimalHeight) {
			animate(window, 0)
		}
		// else {
		// 	// calculate scroll distance
		// 	let distance = Math.floor(currentOffsetTop - optimalHeight)
		// 	// let distance = Math.floor(newOffsetTop - optimalHeight) + 40
		// 	main.style.height = windowHeight + distance - 120 + "px"
		// 	animate(window, distance)
		// }
	})
	resultWrapper.appendChild(resultButton)
	resultWrapper.appendChild(span)
	qhead.appendChild(resultWrapper)
	questionWrapper.appendChild(qhead)

	// answer wrapper
	let answerWrapper = document.createElement("div")
	answerWrapper.className = "answer-wrapper"
	for (i = 0; i < currentQuestion.answer.length; i++) {
		button = document.createElement("button")
		button.type = "button"
		button.value = currentQuestion.answer[i]
		button.innerHTML = currentQuestion.answer[i]
		if (currentQuestion.answer[i].length > 20) {
			button.className = "long-button"
		}

		// register events for buttons
		button.addEventListener("click", function () {
			that = this
			this.parentNode.parentNode.className = "question-wrapper selected"
			this.parentNode.previousSibling.querySelector("button").innerHTML = this.value
			currentQuestion.func(that, result)
			// current button's question's offset top
			let currentOffsetTop = this.parentNode.parentNode.offsetTop
			// new question's offset top
			let newOffsetTop = currentOffsetTop + 90
			// window height
			let windowHeight = window.innerHeight
			// optimal height
			let optimalHeight = Math.floor(windowHeight / 2 - 100)

			// if new question is too low in window, adjust window position
			if (newOffsetTop > optimalHeight) {
				// calculate scroll distance
				let distance = Math.floor(newOffsetTop - optimalHeight)
				// let distance = Math.floor(newOffsetTop - optimalHeight) + 40
				main.style.height = windowHeight + distance - 120 + "px"
				animate(window, distance)
			}
		})
		answerWrapper.appendChild(button)
	}
	questionWrapper.appendChild(answerWrapper)

	// add new question to page
	main.appendChild(questionWrapper)
}

// animation
function animate(obj, targetPosition, callback) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function () {
		console.log("still running");
		var offsetTop = window.pageYOffset;
		// console.log("offsetTop: " + offsetTop);
		// console.log("target: " + targetPosition);
		var step = (targetPosition - offsetTop) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (offsetTop == targetPosition) {
			clearInterval(obj.timer);
			console.log("finish");
			if (callback) {
				callback();
			}
		} else {
			window.scroll(0, offsetTop + step);
		}
	}, 10)
}

creationQuestion(questionData["scene"], "")
