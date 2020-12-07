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
				return true
			} else {
				let recScheme = ["DES", "3DES", "AES", "Block cipher's modes of operations"]
				showResult(recScheme)
				return false
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
				return true
			} else {
				let recScheme = ["SIMON"]
				showResult(recScheme)
				return false
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
				return true
			} else {
				that.parentNode.style.display = "none"
				that.parentNode.previousSibling.querySelector(".result").style.display = "block"
				creationQuestion(questionData["stream"], that.value)
				return true
			}
		}
	},
	hash: {
		question: "Do you need this scheme to work with hash function?",
		answer: ["YES", "NO", "I'm Not Sure"],
		func: function (that, result) {
			// come from feature needs security only
			if (result == "Security-No") {
				if (that.value == "YES") {
					let recScheme = ["AES In CBC Mode", "IDEA"]
					showResult(recScheme)
					return false
				} else {
					let recScheme = ["AES In CBC Mode", "IDEA", "3DES"]
					showResult(recScheme)
					return false
				}
			} else if (result == "Security-Yes") {
				if (that.value == "YES") {
					let recScheme = ["AES In GCM Mode", "IDEA In GCM Mode", "AES In CTR Mode", "IDEA In CTR Mode"]
					showResult(recScheme)
					return false
				} else {
					let recScheme = ["AES In GCM Mode", "IDEA In GCM Mode", "3DES In GCM Mode"]
					showResult(recScheme)
					return false
				}
			} else if (result == "Efficiency-No") {
				if (that.value == "YES") {
					let recScheme = ["AES In GCM Mode", "AES In CBC Mode", "AES In CTR Mode"]
					showResult(recScheme)
					return false
				} else {
					let recScheme = ["AES In GCM Mode", "AES In CBC Mode", "Blowfish In GCM Mode", "Blowfish In CBC Mode"]
					showResult(recScheme)
					return false
				}
			} else if (result == "Efficiency-Yes") {
				if (that.value == "YES") {
					let recScheme = ["AES In GCM Mode", "AES In CTR Mode", "AES In OFB Mode"]
					showResult(recScheme)
					return false
				} else {
					let recScheme = ["AES In GCM Mode", "AES In CTR Mode", "Blowfish In GCM Mode", "Blowfish In CTR Mode"]
					showResult(recScheme)
					return false
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
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["hash"], "Security-Yes")
					return true
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["photo"], "Security")
					return true
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["hash"], "Efficiency-Yes")
					return true
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["photo"], "Efficiency")
					return true
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let recScheme = ["AES In GCM Mode", "AES In CTR Mode", "AES In OFB Mode"]
					showResult(recScheme)
					return false
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["photo"], "Both")
					return true
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
					let recScheme = ["AES In GCM Mode", "AES In CBC Mode", "IDEA In GCM Mode", "3DES In GCM Mode"]
					showResult(recScheme)
					return false
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["hash"], "Security-No")
					return true
				}
			} else if (result == "Efficiency") {
				if (that.value == "YES") {
					let recScheme = ["AES In CBC Mode", "Blowfish In CBC Mode"]
					showResult(recScheme)
					return false
				} else {
					that.parentNode.style.display = "none"
					that.parentNode.previousSibling.querySelector(".result").style.display = "block"
					creationQuestion(questionData["hash"], "Efficiency-No")
					return true
				}
			} else if (result == "Both") {
				if (that.value == "YES") {
					let recScheme = ["AES In GCM Mode", "AES In CBC Mode", "AES In CTR Mode"]
					showResult(recScheme)
					return false
				} else {
					let recScheme = ["AES In GCM Mode", "AES In CBC Mode", "AES In CTR Mode"]
					showResult(recScheme)
					return false
				}
			}
		}
	}
}
