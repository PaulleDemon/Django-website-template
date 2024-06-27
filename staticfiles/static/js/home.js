/**
 * Contains code for home page
 */



const reviewContainer = document.querySelector(".review-container")
const reviewSlideShow = new SlideShow(reviewContainer, true, 10000)


const reviewModal = new Modal(document.querySelector("#modal"))
