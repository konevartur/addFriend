const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

const $pagination = document.querySelector('#pagin');

let preventRequesting = false;
let stopRequest = false;
let pageNumber = 1;


function request(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(JSON.parse(xhr.response));
			} else {
				reject(xhr);
			}
		};
	});
};

function makeRequest() {
	request('GET', `https://reqres.in/api/users?page=${pageNumber}&per_page=3`)
		.then(function (response) {
			const cardsArray = response.data;
			if (response.data.length === 0) {
				stopRequest = true;
			}

			preventRequesting = false;

			cardsArray.forEach((user) => {

				const $card = $cardTpl.cloneNode(true);

				$card.removeAttribute('id');
				$card.removeAttribute('style');

				const $userName = $card.querySelector('.js-user-name');
				const $userAva = $card.querySelector('.js-user-ava');

				$userName.textContent = `${user.first_name}`;
				$userAva.setAttribute('src', user.avatar);

				$cardsWrapper.append($card);
			});
		});
}

makeRequest();

$mainRight.addEventListener('click', event => {
	if (event.target.classList.contains('btn-delete-user')) {
		const deleteCardUser = event.target.closest('.card-friends');
		deleteCardUser.remove();
	}
});

window.addEventListener('scroll', function () {
	if (!stopRequest) {
		if (!preventRequesting && (Math.ceil(window.pageYOffset + innerHeight) + 150) > document.body.clientHeight) {
			preventRequesting = true;
			pageNumber++;
			makeRequest();
		}
	}
});

// если ответ с пустым массивом, то больше не делать запрос
// отталкиваться от флага
