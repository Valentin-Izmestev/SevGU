@@include('jquery-1.12.1.js');
@@include('choices.min.js');



document.addEventListener('DOMContentLoaded', ready);

function ready() {


    let greatShadow = document.querySelector('.great-shadow');
    let showModalBtn = document.querySelectorAll('.show-modal');
    let allRightModals = document.querySelectorAll('.right-modal');

    function showModal(modal) {
        let curretnModal = document.querySelector('.' + modal);
        document.body.style.overflow = 'hidden';
        greatShadow.classList.add('active');
        curretnModal.classList.add('right-modal--show');
        let currentCloseModalBtn = curretnModal.querySelector('.close-modal-btn');
        currentCloseModalBtn.addEventListener('click', closeModal);
    }

    function closeModal() {
        allRightModals.forEach(modal => {
            modal.classList.remove('right-modal--show');
        });
        greatShadow.classList.remove('active');
        document.body.style.overflow = '';
    }
    greatShadow.addEventListener('click', closeModal);
    showModalBtn.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            showModal(item.getAttribute('data-modal'));
        });
    });
    let sidePanelLabel = document.querySelectorAll('.side-panel-label')
    sidePanelLabel.forEach(item => {
        item.addEventListener('click', () => {
            greatShadow.classList.remove('active');
        })
    })


    let arFormCategory = [];
    let formCategorySelects = document.querySelectorAll('.form-elem-select__item');
    if (formCategorySelects.length > 0) {
        formCategorySelects.forEach(select => {
            let currentSelect;
            if (select.classList.contains('form-elem-select__item--no-search')) {
                currentSelect = new Choices(select, {
                    noResultsText: 'Значение не найдено',
                    loadingText: 'Загрузка...',
                    placeholder: true,
                    placeholderValue: '',
                    searchEnabled: false,
                });
            } else {
                currentSelect = new Choices(select, {
                    noResultsText: 'Значение не найдено',
                    loadingText: 'Загрузка...',
                    placeholder: true,
                    placeholderValue: '',
                    searchPlaceholderValue: 'Введите искомое значение',
                });
            }
            arFormCategory.push(currentSelect);

            select.addEventListener('change', function () {
                console.log(this.value)
                if (this.value != '') {
                    this.closest('.form-elem-select').classList.add('form-elem--active');

                    if (this.classList.contains('form__category-select--for-tab')) {
                        let thisSelect = this;
                        let currentForm = thisSelect.closest('.form-creating-petitions');
                        let formTabContainers = currentForm.querySelectorAll('.form-creating-petitions__container');
                        let formSubmit = currentForm.querySelector('.btn[type="submit"]');
                        formSubmit.removeAttribute('disabled');
                        formTabContainers.forEach(container => {
                            if (container.getAttribute('id') === thisSelect.firstElementChild.getAttribute('value')) {
                                container.style.display = 'block';
                            } else {
                                container.removeAttribute('style');
                            }
                        });
                    }

                }
            });

        });
    }
};

$(function () {
    let spoilerBtn = $('.spoiler__btn');
    spoilerBtn.on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle(200);
    })
});