// получение элементов из DOM
const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

const $modal = document.getElementById('mymodal');

// картинка и текст из модального окна с формой
const $textModal = document.querySelector('.modal-cf-text');
const $imgModal = document.querySelector('.modal-cf-image');

// пустая картинка из карточки
const $emptyAva = document.querySelector('.card-friends__empty_ava');

// глобальная переменная для аватарки
let imgSrc;

// удалить карточку через делегирование
// открыть модальное окно через делегирование
$mainRight.addEventListener('click', event => {
	if (event.target.classList.contains('btn-delete-user')) {
		const deleteCardUser = event.target.closest('.card-friends');
		deleteCardUser.remove();
	}

	if (event.target.classList.contains('js-btn-info')) {
		mymodal.style.display = 'block';

		appendInfoFriend(event);
	}

	if (event.target.classList.contains('fa-times-circle')) {
		mymodal.style.display = 'none';
	}
});

// закрываю модальное по нажатию на пустое место
window.addEventListener('click', event => {
	if (event.target == $modal) {
		mymodal.style.display = 'none';
	}

	if (event.target == $modalCreateFriend) {
		modal_cf.style.display = 'none';
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

// закрываю модальное окно
function closeModal() {
	note_done.style.display = 'block';
	modal_cf.style.display = 'none';

	setTimeout(() => {
		note_done.style.display = 'none';
	}, 2000);
}

// отправка формы
const $form = document.getElementById('modal-cf-form');
$form.addEventListener('submit', submitHandler);

function submitHandler(event) {
	event.preventDefault();

	const name = $form.querySelector('[name="name"]'),
		lastName = $form.querySelector('[name="last-name"]'),
		email = $form.querySelector('[name="email"]'),
		tel = $form.querySelector('[name="tel"]'),
		text = $form.querySelector('[name="text"]');

	const valuesForm = {
		name: name.value,
		lastName: lastName.value,
		email: email.value,
		tel: tel.value,
		text: text.value
	};

	closeModal();
	appendCard(valuesForm);

	event.target.reset();

	$textModal.style.display = 'block';
	$imgModal.innerHTML = '';
}

// поля из модального окна карточки
const $friendNameFromModal = document.getElementById('js-user-name');
const $friendLastNameFromModal = document.querySelector('.js-last-name');
const $friendEmail = document.querySelector('.js-email');
const $friendTel = document.querySelector('.js-tel');
const $friendText = document.querySelector('.js-text');

// вставляю значения из формы в модальное окно карточки
function appendInfoFriend(event) {
	const $card = event.target.closest('.card-friends');

	$friendNameFromModal.textContent = $card.querySelector('.js-user-name').innerText;
	$friendLastNameFromModal.textContent = $card.getAttribute('data-lastname');
	$friendEmail.textContent = $card.getAttribute('data-email');
	$friendTel.textContent = $card.getAttribute('data-tel');
	$friendText.textContent = $card.getAttribute('data-text');
}

// создание карточки
function appendCard(valuesForm) {

	const $card = $cardTpl.cloneNode(true);

	$card.removeAttribute('id');
	$card.removeAttribute('style');

	const userName = $card.querySelector('.js-user-name');
	userName.textContent = valuesForm.name;

	$card.setAttribute('data-lastname', valuesForm.lastName);
	$card.setAttribute('data-email', valuesForm.email);
	$card.setAttribute('data-tel', valuesForm.tel);
	$card.setAttribute('data-text', valuesForm.text);

	const userImg = $card.querySelector('.card-friends__ava');

	debugger
	if (imgSrc) {
		const userAva = document.createElement('img');
		userAva.setAttribute('src', imgSrc);
		userImg.insertAdjacentElement('afterbegin', userAva);
		imgSrc = null;
		$emptyAva.style.display = 'none'
	}
	
	$cardsWrapper.insertAdjacentElement('afterbegin', $card);
}



// загрузка аватарки в модальном окне
upload({
	accept: ['.png', '.jpg', '.jpge', '.gif']
});

function upload(options = {}) {
	const $uploadImg = document.getElementById('modal-cf-file');
	const $avaInModal = document.querySelector('.modal-cf-ava');

	$avaInModal.addEventListener('click', triggerInput);
	$uploadImg.addEventListener('change', changeImg);

	$uploadImg.insertAdjacentElement('afterend', $avaInModal);

	if (options.accept && Array.isArray(options.accept)) {
		$uploadImg.setAttribute('accept', options.accept.join(','));
	}

	function changeImg(event) {
		if (!event.target.files.length) {
			return
		}

		const reader = new FileReader();

		reader.onload = event => {
			$imgModal.innerHTML = `<img src="${event.target.result}" alt="ava"/>`;

			$imgModal.style.display = 'block';
			$textModal.style.display = 'none';

			imgSrc = event.target.result;
		}

		reader.readAsDataURL(this.files[0]);
	}

	function triggerInput(event) {
		event.preventDefault();
		$uploadImg.click();
	}
}

// загрузка аватарки пользователя
uploadUserAva({
	accept: ['.png', '.jpg', '.jpge', '.gif']
});

function uploadUserAva(options = {}) {
	const $uploadUserAva = document.getElementById('main_left__file');
	const $userAva = document.querySelector('.main_left__ava');

	$userAva.addEventListener('click', triggerInput);
	$uploadUserAva.addEventListener('change', changeImg);

	$uploadUserAva.insertAdjacentElement('afterend', $userAva);

	if (options.accept && Array.isArray(options.accept)) {
		$uploadUserAva.setAttribute('accept', options.accept.join(','));
	}

	function changeImg(event) {
		if (!event.target.files.length) {
			return
		}

		const reader = new FileReader();

		reader.onload = event => {
			$userAva.innerHTML = `<img src="${event.target.result}" alt="ava"/>`;
		}

		reader.readAsDataURL(this.files[0]);
	}

	function triggerInput(event) {
		event.preventDefault();
		$uploadUserAva.click();
	}
}