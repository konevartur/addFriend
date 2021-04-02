// получение элементов из DOM
const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

const $preloader = document.querySelector('#preloader');

const $jsBtnInfo = document.querySelector('.js-btn-info');
const $modal = document.getElementById('mymodal');
const $closeModal = document.querySelector('.close-mymodal');

// флаги
let preventRequesting = false;
let stopRequest = true;
let preventRequestInModal = false;
let pageNumber = 1;

// HTTP-запрос к серверу без перезагрузки страницы
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
		}
	});
}

// запрос
function makeRequest() {
	request('GET', `https://reqres.in/api/users?page=${pageNumber}&per_page=3`)
		.then(function (response) {
			const cardsArray = response.data;

			// условие для остановки запросов
			if (cardsArray.length === 0) {
				stopRequest = false;
			}
			// скрываю лоадер
			$preloader.classList.add('hide');

			// предотвращаю запрос
			preventRequesting = false;

			// перебираю массив и отрисовываю карточку
			cardsArray.forEach((user) => {
				const $card = $cardTpl.cloneNode(true);

				$card.removeAttribute('id');
				$card.removeAttribute('style');

				const $userName = $card.querySelector('.js-user-name');
				const $userAva = $card.querySelector('.js-user-ava');

				$userName.textContent = `${user.first_name}`;
				$userAva.setAttribute('src', user.avatar);

				$card.setAttribute('data-user_id', user.id);
				$cardsWrapper.append($card);

			});
		});
}
// вызов функции
makeRequest();


// удалить карточку через делегирование
// открыть модальное окно через делегирование
$mainRight.addEventListener('click', event => {
	if (event.target.classList.contains('btn-delete-user')) {
		const deleteCardUser = event.target.closest('.card-friends');
		deleteCardUser.remove();
	}

	// добавление данных в модальное окно
	if (!preventRequestInModal) {
		if (event.target.classList.contains('js-btn-info')) {

			const $userCard = event.target.closest('.card-friends');
			const id = $userCard.getAttribute('data-user_id');

			preventRequestInModal = true;

			request('GET', `https://reqres.in/api/users/${id}`)
				.then(response => {
					
					preventRequestInModal = false;

					const user = response.data;

					const $userName = document.querySelector('#js-user-name');
					const $userLastName = document.querySelector('.js-last-name');
					const $userEmail = document.querySelector('.js-email');

					$userName.textContent = `${user.first_name}`;
					$userLastName.textContent = `${user.last_name}`;
					$userEmail.textContent = `${user.email}`;
					
					mymodal.style.display = 'block';
				});
		}
	}
});

// скролл страницы
window.addEventListener('scroll', () => {
	if (stopRequest) {
		if (!preventRequesting && (Math.ceil(window.pageYOffset + innerHeight) + 150) > document.body.clientHeight) {
			preventRequesting = true;
			pageNumber++;
			$preloader.classList.remove('hide');
			makeRequest();
		}
	}
});

// закрываю модальное окно на крест
$closeModal.addEventListener('click', () => {
	mymodal.style.display = 'none';
});

// закрываю модальное по нажатию на пустое место
window.addEventListener('click', event => {
	if (event.target == $modal) {
		mymodal.style.display = 'none';
	}
});


// модальное окно по созданию записи о друге
const $btnCreateFriend = document.getElementById('btn-create-friend');
const $modalCreateFriend = document.getElementById('modal_cf');
const $closeModalCreateFriend = document.querySelector('.close-modal-cf');

$btnCreateFriend.addEventListener('click', () => {
	modal_cf.style.display = 'block';
});

// закрываю модальное окно на крест
$closeModalCreateFriend.addEventListener('click', () => {
	modal_cf.style.display = 'none';
});

// закрываю модальное по нажатию на пустое место
window.addEventListener('click', event => {
	if (event.target == $modalCreateFriend) {
		modal_cf.style.display = 'none';
	}
});