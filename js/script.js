// получение элементов из DOM
const $right = document.querySelector('.right');
const $cardsWrapper = document.getElementById('cards_wrapper');
const $cardFrendsTemplate = document.getElementById('card_frends_template');

const $modalInfo = document.querySelector('.modal_info');

const $modalCreateNodeText = document.querySelector('.modal_create_node__text');
const $modalCreateNodeImage = document.querySelector('.modal_create_node__image');

const $btnCreateNode = document.querySelector('.btn__create-node');
const $modalCreateNode = document.querySelector('.modal_create_node');
const $modalCreateNodeBtnClose = document.querySelector('.modal_create_node__btn_close');

// максимальный размер картинки
const MAX_IMG_SIZE = 5_000_000;

// глобальная переменная для аватарки
let imgInModalForm;

// удалить карточку через делегирование
// открыть модальное окно через делегирование
$right.addEventListener('click', event => {
	if (event.target.classList.contains('card_friends__btn_delete')) {
		const deleteCardUser = event.target.closest('.card_friends');
		const userId = deleteCardUser.getAttribute('data-id');

		localStorage.removeItem('card_' + userId);
		localStorage.removeItem('card_image_' + userId);

		deleteCardUser.remove();
	}

	if (event.target.classList.contains('card_friends__btn_info')) {
		const deleteCardUser = event.target.closest('.card_friends');
		const userId = deleteCardUser.getAttribute('data-id');
		$modalInfo.style.display = 'block';

		appendInfoFriend(userId);
	}

	if (event.target.classList.contains('fa-times-circle')) {
		$modalInfo.style.display = 'none';
	}
});

// закрываю модальное по нажатию на пустое место
window.addEventListener('click', event => {
	if (event.target == $modalInfo) {
		$modalInfo.style.display = 'none';
	}

	if (event.target == $modalCreateNode) {
		$modalCreateNode.style.display = 'none';
	}
});

$btnCreateNode.addEventListener('click', () => {
	$modalCreateNode.style.display = 'block';
});

// закрываю модальное окно на крест
$modalCreateNodeBtnClose.addEventListener('click', () => {
	$modalCreateNode.style.display = 'none';
});

// достаю пользователей из ls и рендерю их
(function () {

	let usersArr = [];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);

		if (key === null) {
			break;
		}

		if (key.indexOf('card_') === -1) {
			continue;
		}

		const lsValue = localStorage.getItem(key);

		if (key.indexOf('card_image_') === -1) {
			const userData = JSON.parse(lsValue);
			usersArr.push({
				data: userData,
				img: localStorage.getItem('card_image_' + userData.id)
			});
		}
	}

	usersArr = usersArr.sort(function (a, b) {
		return a.data.id - b.data.id;
	});

	usersArr.forEach(function (user) {
		imgInModalForm = user.img;
		appendCard(user.data);
	});

	usersArr = null;

})();

// вывод предупреждения, если ls переполнен
function checkLocalStorageImageInsertion(key, value, successCb) {
	try {
		localStorage.setItem(key, value);
		if (typeof successCb === 'function') {
			successCb();
		}
	} catch(e) {
		alert('LocalStorage переполнено! Извините, у нас нет столько денег $, чтобы пилить сервер ☺ Просим понять и простить ♥');
		imgInModalForm = null;
	}
}

// закрываю модальное окно
function closeModal() {
	note_done.style.display = 'block';
	$modalCreateNode.style.display = 'none';

	setTimeout(() => {
		note_done.style.display = 'none';
	}, 2000);
}

// отправка формы
const $form = document.querySelector('.modal_create_node__form');
$form.addEventListener('submit', submitHandler);

function submitHandler(event) {
	event.preventDefault();

	const name = $form.querySelector('[name="name"]'),
		lastName = $form.querySelector('[name="last-name"]'),
		email = $form.querySelector('[name="email"]'),
		tel = $form.querySelector('[name="tel"]'),
		text = $form.querySelector('[name="text"]');

	const valuesForm = {
		id: Date.now(),
		name: name.value,
		lastName: lastName.value,
		email: email.value,
		tel: tel.value,
		text: text.value
	};

	localStorage.setItem('card_' + valuesForm.id, JSON.stringify(valuesForm));
	if (imgInModalForm) {
		checkLocalStorageImageInsertion('card_image_' + valuesForm.id, imgInModalForm);
	}

	closeModal();
	appendCard(valuesForm);

	event.target.reset();

	$modalCreateNodeText.style.display = 'block';
	$modalCreateNodeImage.innerHTML = '';
}

// поля из модального окна карточки
const $modalInfoName = document.querySelector('.modal_info__name');
const $modalInfoLastName = document.querySelector('.modal_info__last_name');
const $modalInfoEmail = document.querySelector('.modal_info__email');
const $modalInfoTel = document.querySelector('.modal_info__tel');
const $modalInfoText = document.querySelector('.modal_info__text');

// вставляю значения из формы в модальное окно карточки
function appendInfoFriend(userId) {
	const lsValue = localStorage.getItem('card_' + userId);
	const userData = JSON.parse(lsValue);

	$modalInfoName.textContent = userData.name;
	$modalInfoLastName.textContent = userData.lastName;
	$modalInfoEmail.textContent = userData.email;
	$modalInfoTel.textContent = userData.tel;
	$modalInfoText.textContent = userData.text;
}

// добавление карточки
function appendCard(valuesForm) {

	const $card = $cardFrendsTemplate.cloneNode(true);

	$card.removeAttribute('id');
	$card.removeAttribute('style');

	const userName = $card.querySelector('.card_friends__name');
	userName.textContent = valuesForm.name;

	$card.setAttribute('data-id', valuesForm.id);

	// пустая картинка из карточки
	const $cardFriendsEmptyAva = $card.querySelector('.card_friends__empty_ava');
	$cardFriendsEmptyAva.style.display = 'none';

	const userImg = $card.querySelector('.card_friends__ava');

	if (imgInModalForm) {
		const userAva = document.createElement('img');
		userAva.setAttribute('src', imgInModalForm);
		userImg.insertAdjacentElement('afterbegin', userAva);
		imgInModalForm = null;
	}
	else {
		$cardFriendsEmptyAva.style.display = 'block';
	}

	$cardsWrapper.insertAdjacentElement('afterbegin', $card);
}

// загрузка аватарки в модальном окне
upload({
	accept: ['.png', '.jpg', '.jpge', '.gif']
});

function upload(options = {}) {
	const $modalCreateNodeFile = document.getElementById('modal_create_node__file');
	const $modalCreateNodeAva = document.querySelector('.modal_create_node__ava');

	$modalCreateNodeAva.addEventListener('click', triggerInput);
	$modalCreateNodeFile.addEventListener('change', changeImg);

	$modalCreateNodeFile.insertAdjacentElement('afterend', $modalCreateNodeAva);

	if (options.accept && Array.isArray(options.accept)) {
		$modalCreateNodeFile.setAttribute('accept', options.accept.join(','));
	}

	function changeImg(event) {
		if (!event.target.files.length) {
			return
		}

		const reader = new FileReader();

		reader.onload = event => {
			if (event.loaded < MAX_IMG_SIZE) {
				$modalCreateNodeImage.innerHTML = `<img src="${event.target.result}" alt="ava"/>`;

				$modalCreateNodeImage.style.display = 'block';
				$modalCreateNodeText.style.display = 'none';

				imgInModalForm = event.target.result;
			} else {
				alert('Размер файла должен быть меньше '+ MAX_IMG_SIZE +' Б');
			}
		}

		reader.readAsDataURL(this.files[0]);
	}

	function triggerInput(event) {
		event.preventDefault();
		$modalCreateNodeFile.click();
	}
}

// загрузка аватарки пользователя
uploadUserAva({
	accept: ['.png', '.jpg', '.jpge', '.gif']
});

function uploadUserAva(options = {}) {
	const $leftFile = document.getElementById('left__file');
	const $leftAva = document.querySelector('.left__ava');

	const userAvaFromLs = localStorage.getItem('user_ava');

	const setUserAva = (ava) => {
		$leftAva.innerHTML = `<img src="${ava}" alt="ava"/>`;
	};

	if (userAvaFromLs) {
		setUserAva(userAvaFromLs);
	}

	$leftAva.addEventListener('click', triggerInput);
	$leftFile.addEventListener('change', changeImg);

	$leftFile.insertAdjacentElement('afterend', $leftAva);

	if (options.accept && Array.isArray(options.accept)) {
		$leftFile.setAttribute('accept', options.accept.join(','));
	}

	function changeImg(event) {
		if (!event.target.files.length) {
			return
		}

		const reader = new FileReader();

		reader.onload = event => {
			if (event.loaded < MAX_IMG_SIZE) {
				checkLocalStorageImageInsertion('user_ava', event.target.result, function () {
					setUserAva(event.target.result);
				});
			} else {
				alert('Размер файла должен быть меньше '+ MAX_IMG_SIZE +' Б');
			}
		}

		reader.readAsDataURL(this.files[0]);
	}

	function triggerInput(event) {
		event.preventDefault();
		$leftFile.click();
	}
}
