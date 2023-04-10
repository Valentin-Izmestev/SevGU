@@include('jquery-1.12.1.js');
@@include('choices.min.js');
@@include('jquery.maskedinput.js');



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

    let sortSelect =  new Choices('.sort-select', { 
        placeholder: true,
        placeholderValue: '',
        searchEnabled: false,
    });

    let subtaskPoilerBtns = $('.subtask-spoiler__btn');
    subtaskPoilerBtns.on('click', function(){
        let parent = $(this).closest('.subtask-spoiler');
        parent.toggleClass('subtask-spoiler--active');
        parent.find('.subtask-spoiler__bag').slideToggle(200);
    })
    //  
    /*
    formatManey - функция, которая валидирует данные вводимые в поле для валюты и еще работает как маска расставляя пробелы между тысячными разрядами. 
    target - объект input, чьи вводимые данные нужно обрабатывать
    */
    function formatManey(target){
        let val = target.value.replace(/[^0-9.]/g, '');
        if(val.indexOf('.') != '-1'){ 
            val = val.substring(0, val.indexOf('.')  + 3); 
        }
        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        target.value = val;
    }
    // 
    let moneyInputs = document.querySelectorAll('.vi-mask--money');

    if(moneyInputs.length > 0){ 
        moneyInputs.forEach(item=>{ 
            item.addEventListener('input', function(e){ 
                formatManey(this)
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
    });
 
   $(".phone").mask("+7 (999) 999-99-99");
 
});

// 
// 
// author-marker-link

let arrAuthorMarkerLink = document.querySelectorAll('.article-list-table .author-marker-link-box');

arrAuthorMarkerLink.forEach(item=>{ 
    if(item.children.length > 4){ 
        let counter = 0;
        for(let i = 0; i < item.children.length; i++){
            counter++; 
            if(counter > 4){
                item.children[i].classList.add('author-marker-link--hide');
            } 
            
        } 
        item.insertAdjacentHTML('beforeend', `<button class="author-marker-link author-marker-link--limiter">Еще + <span>${item.children.length-4}</span></button>`)
    }
    item.addEventListener('click', function(e){ 
        if(e.target.classList.contains('author-marker-link--limiter') || e.target.parentElement.classList.contains('author-marker-link--limiter')){
             let hideElem = item.querySelectorAll('.author-marker-link--hide');
             let limiter = item.querySelector('.author-marker-link--limiter');
             hideElem.forEach(item=>{
                item.classList.remove('author-marker-link--hide');
             });
             limiter.remove();
        }
    });
});
 