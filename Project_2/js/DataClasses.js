// Базовый класс контента
class Content{
    // Конструктор
    constructor(_id=undefined, _name='undefined', _description='undefined', _status=undefined) {
        this._name = _name
        this._id = _id
        this._description = _description
        this._status = _status
    }
    // Получить имя
    get _name() {
        return this.name
    }
    // Установить имя
    set _name(value) {
        try{
            this.name = String(value)
        }catch (e){
            this.name = 'undefined'
        }
    }
    // Получить id
    get _id(){
        return this.id
    }
    // Установить id
    set _id(value){
        try{
            if(isNaN(value)){
                this.id = 'undefined'
            }
            else{
                this.id = Number(value)
            }
        }catch (e) {
            this.id = 'undefined'
        }

    }
    // Получить описание контента
    get _description(){
        return this.description
    }
    // Установить описание контента
    set _description(value) {
        this.description = String(value)
    }
    // Получить статус
    get _status(){
        return this.status
    }
    // Установить статус
    set _status(value) {
        this.status = value
    }
}
// Производный класс контента СМС от класса контента
class ContentSMS extends Content{
    // Конструктор
    constructor(_id=undefined, _name='undefined', _description='undefined', _status=undefined, _content='undefined') {
        super(_id, _name, _description, _status);
        this._content = _content
    }
    // Получить текст сообщения
    get _content(){
        return this.content
    }
    // Установить текст сообщения
    set _content(value) {
        this.content = value
    }
}
// Массив контента СМС
class ArrayContentSMS{
    contents=[]
    // Получить массив публикации
    get _contents(){
        return this.contents
    }
    // Установить масиив публикации
    set _contents(value) {
        this.contents.push(value)
    }
    // Функция поиска в массиве объектов
    Search(text){
        let newObj = new ArrayContentSMS()
        let flag = false
        text = String(text)
        try{
            for(let i in this._contents){
                try{
                    if(text.toLowerCase() == this._contents[i]._name.toLowerCase()){
                        newObj._contents.push(this._contents[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._contents[i]._description.toLowerCase()) {
                        newObj._contents.push(this._contents[i])
                        flag = true
                    }
                    else if(this._contents[i]._name.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._contents.push(this._contents[i])
                        flag = true
                    }
                    else if(this._contents[i]._description.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._contents.push(this._contents[i])
                        flag = true
                    }
                }catch (e) {
                    console.log('Error:\n'+e)
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
        finally {
            if(flag){
                return newObj
            }
            else{
                return null
            }
        }
    }
    // Функция сортировки
    Sort(sortProperty, order){
        try{
            if(order == 'increasing'){
                if(sortProperty == 'name'){
                    this.contents.sort((prev, next) => prev.name.localeCompare(next.name))
                }
                else if(sortProperty == 'description'){
                    this.contents.sort((prev, next) => prev.description.localeCompare(next.description))
                }
                else if(sortProperty == 'status'){
                    this.contents.sort.sort((prev, next) => prev.status - next.status);
                }
            }
            else if(order == 'decreasing'){
                if(sortProperty == 'name'){
                    this.contents.sort((prev, next) => next.name.localeCompare(prev.name))
                }
                else if(sortProperty == 'description'){
                    this.contents.sort((prev, next) => next.description.localeCompare(prev.description))
                }
                else if(sortProperty == 'status'){
                    this.contents.sort.sort((prev, next) => next.status - prev.status);
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
    }
}
// Производный класс публикации для класа контента смс
class PublicationSMS extends ContentSMS{
    // Конструктор
    constructor(_id=undefined, _name='undefined', _description='undefined', _status=undefined, _content='undefined', _date='undefined', _publucationPlan='undefined', _recipient='undefined') {
        super(_id, _name, _description, _status, _content);
        this._publucationPlan = _publucationPlan
        this._date = _date
        this._recipient = _recipient
    }
    // Получить план публикации
    get _publucationPlan(){
        return this.publucationPlan
    }
    // Установить план публикации
    set _publucationPlan(value) {
        this.publucationPlan = value
    }
    // Получить дату публикации
    get _date(){
        return this.date
    }
    // Установить дату публикации
    set _date(value) {
        this.date = value
    }
    // Получить получателя
    get _recipient(){
        return this.recipient
    }
    // Установить получателя публикации
    set _recipient(value) {
        this.recipient = String(value)
    }
}
// Производный класс контента Email от класса контента
class ContentEmail extends Content{
    // Конструктор
    constructor(_id=undefined, _name='undefined', _description='undefined', _status=undefined, _content='undefined', _title='undefined') {
        super(_id, _name, _description, _status);
        this._content = _content
        this._title = _title
    }
    // Получить текст сообщения
    get _content(){
        return this.content
    }
    // Установить текст сообщения
    set _content(value) {
        this.content = value
    }
    // Получить заголовок сообщения
    get _title(){
        return this.title
    }
    // Установить заголовок сообщения
    set _title(value) {
        this.title = value
    }
}
// Производный класс публикации для класа контента Email
class PublicationEmail extends ContentEmail{
    // Конструктор
    constructor(_id=undefined, _name='undefined', _description='undefined', _status=undefined, _content='undefined', _title='undefined', _date='undefined', _publucationPlan='undefined', _recipient='undefined') {
        super(_id, _name, _description, _status, _content, _title);
        this._publucationPlan = _publucationPlan
        this._date = _date
        this._recipient = _recipient
    }
    // Получить план публикации
    get _publucationPlan(){
        return this.publucationPlan
    }
    // Установить план публикации
    set _publucationPlan(value) {
        this.publucationPlan = value
    }
    // Получить дату публикации
    get _date(){
        return this.date
    }
    // Установить дату публикации
    set _date(value) {
        this.date = value
    }
    // Получить получателя
    get _recipient(){
        return this.recipient
    }
    // Установить получателя публикации
    set _recipient(value) {
        this.recipient = String(value)
    }
}
// Массив публикаций
class ArrayPublications {
    publications=[]
    // Получить массив публикации
    get _publications(){
        return this.publications
    }
    // Установить масиив публикации
    set _publications(value) {
        this.publications.push(value)
    }
}
// Массив публикаций текста
class ArrayPublicationsSMS extends ArrayPublications{
    // Функция поиска в массиве объектов
    Search(text){
        let newObj = new ArrayPublications()
        let flag = false
        text = String(text)
        try{
            for(let i in this._publications){
                try{
                    if(text.toLowerCase() == this._publications[i]._name.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._description.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._recipient.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._publucationPlan.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._day){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._month){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._year){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._time){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._name.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._description.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._recipient.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._publucationPlan.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._day.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._month.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._year.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._time.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                }catch (e) {
                    console.log('Error:\n'+e)
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
        finally {
            if(flag){
                return newObj
            }
            else{
                return null
            }
        }
    }
    // Функция сортировки
    Sort(sortProperty, order){
        try{
            if(order == 'increasing'){
                if(sortProperty == 'name'){
                    this._publications.sort((prev, next) => prev._name.localeCompare(next._name))
                }
                else if(sortProperty == 'description'){
                    this._publications.sort((prev, next) => prev._description.localeCompare(next._description))
                }
                else if(sortProperty == 'recipient'){
                    this._publications.sort((prev, next) => prev._recipient.localeCompare(next._recipient))
                }
                else if(sortProperty == 'content'){
                    this._publications.sort((prev, next) => prev._content.localeCompare(next._content))
                }
                else if(sortProperty == 'publucationPlan'){
                    this._publications.sort((prev, next) => prev._publucationPlan.localeCompare(next._publucationPlan))
                }
                else if(sortProperty == 'status'){
                    this._publications.sort((prev, next) => prev._status - next._status);
                }
                else if(sortProperty == 'year'){
                    this._publications.sort((prev, next) => prev._date._year.localeCompare(next._date._year))
                }
                else if(sortProperty == 'month'){
                    this._publications.sort((prev, next) => prev._date._month.localeCompare(next._date._month))
                }
                else if(sortProperty == 'day'){
                    this._publications.sort((prev, next) => prev._date._day.localeCompare(next._date._day))
                }
                else if(sortProperty == 'time'){
                    this._publications.sort((prev, next) => prev._date._time.localeCompare(next._date._time))
                }
            }
            else if(order == 'decreasing'){
                if(sortProperty == 'name'){
                    this._publications.sort((prev, next) => next._name.localeCompare(prev._name))
                }
                else if(sortProperty == 'description'){
                    this._publications.sort((prev, next) => next._description.localeCompare(prev._description))
                }
                else if(sortProperty == 'recipient'){
                    this._publications.sort((prev, next) => next._recipient.localeCompare(prev._recipient))
                }
                else if(sortProperty == 'content'){
                    this._publications.sort((prev, next) => next._content.localeCompare(prev._content))
                }
                else if(sortProperty == 'publucationPlan'){
                    this._publications.sort((prev, next) => next._publucationPlan.localeCompare(prev._publucationPlan))
                }
                else if(sortProperty == 'status'){
                    this._publications.sort((prev, next) => next._status - prev._status);
                }
                else if(sortProperty == 'year'){
                    this._publications.sort((prev, next) => next._date._year.localeCompare(prev._date._year))
                }
                else if(sortProperty == 'month'){
                    this._publications.sort((prev, next) => next._date._month.localeCompare(prev._date._month))
                }
                else if(sortProperty == 'day'){
                    this._publications.sort((prev, next) => next._date._day.localeCompare(prev._date._day))
                }
                else if(sortProperty == 'time'){
                    this._publications.sort((prev, next) => next._date._time.localeCompare(prev._date._time))
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
    }
}
// Массив публикаций Email
class ArrayPublicationsEmail extends ArrayPublications{
    // Функция поиска в массиве объектов
    Search(text){
        let newObj = new ArrayPublications()
        let flag = false
        text = String(text)
        try{
            for(let i in this._publications){
                try{
                    if(text.toLowerCase() == this._publications[i]._name.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._title.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._description.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._recipient.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._publications[i]._publucationPlan.toLowerCase()){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._day){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._month){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._year){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(text == this._publications[i]._date._time){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._name.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._title.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._description.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._recipient.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._publucationPlan.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._day.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._month.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._year.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                    else if(this._publications[i]._date._time.startsWith(text)){
                        newObj._publications.push(this._publications[i])
                        flag = true
                    }
                }catch (e) {
                    console.log('Error:\n'+e)
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
        finally {
            if(flag){
                return newObj
            }
            else{
                return null
            }
        }
    }
    // Функция сортировки
    Sort(sortProperty, order){
        try{
            if(order == 'increasing'){
                if(sortProperty == 'name'){
                    this._publications.sort((prev, next) => prev._name.localeCompare(next._name))
                }
                else if(sortProperty == 'title'){
                    this._publications.sort((prev, next) => prev._title.localeCompare(next._title))
                }
                else if(sortProperty == 'description'){
                    this._publications.sort((prev, next) => prev._description.localeCompare(next._description))
                }
                else if(sortProperty == 'recipient'){
                    this._publications.sort((prev, next) => prev._recipient.localeCompare(next._recipient))
                }
                else if(sortProperty == 'content'){
                    this._publications.sort((prev, next) => prev._content.localeCompare(next._content))
                }
                else if(sortProperty == 'publucationPlan'){
                    this._publications.sort((prev, next) => prev._publucationPlan.localeCompare(next._publucationPlan))
                }
                else if(sortProperty == 'status'){
                    this._publications.sort.sort((prev, next) => prev._status - next._status);
                }
                else if(sortProperty == 'year'){
                    this._publications.sort((prev, next) => prev._date._year.localeCompare(next._date._year))
                }
                else if(sortProperty == 'month'){
                    this._publications.sort((prev, next) => prev._date._month.localeCompare(next._date._month))
                }
                else if(sortProperty == 'day'){
                    this._publications.sort((prev, next) => prev._date._day.localeCompare(next._date._day))
                }
                else if(sortProperty == 'time'){
                    this._publications.sort((prev, next) => prev._date._time.localeCompare(next._date._time))
                }
            }
            else if(order == 'decreasing'){
                if(sortProperty == 'name'){
                    this._publications.sort((prev, next) => next._name.localeCompare(prev._name))
                }
                else if(sortProperty == 'title'){
                    this._publications.sort((prev, next) => next._title.localeCompare(prev._title))
                }
                else if(sortProperty == 'description'){
                    this._publications.sort((prev, next) => next._description.localeCompare(prev._description))
                }
                else if(sortProperty == 'recipient'){
                    this._publications.sort((prev, next) => next._recipient.localeCompare(prev._recipient))
                }
                else if(sortProperty == 'content'){
                    this._publications.sort((prev, next) => next._content.localeCompare(prev._content))
                }
                else if(sortProperty == 'publucationPlan'){
                    this._publications.sort((prev, next) => next._publucationPlan.localeCompare(prev._publucationPlan))
                }
                else if(sortProperty == 'status'){
                    this._publications.sort.sort((prev, next) => next._status - prev._status);
                }
                else if(sortProperty == 'year'){
                    this._publications.sort((prev, next) => next._date._year.localeCompare(prev._date._year))
                }
                else if(sortProperty == 'month'){
                    this._publications.sort((prev, next) => next._date._month.localeCompare(prev._date._month))
                }
                else if(sortProperty == 'day'){
                    this._publications.sort((prev, next) => next._date._day.localeCompare(prev._date._day))
                }
                else if(sortProperty == 'time'){
                    this._publications.sort((prev, next) => next._date._time.localeCompare(prev._date._time))
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
    }
}
// Дата публикации
class DatePublication{
    // Конструктор
    constructor(_day='undefined', _month='undefined', _year='undefined', _time='undefined'){
        this._day = _day
        this._month = _month
        this._year = _year
        this._time = _time
    }

    // Получить день публикации
    get _day(){
        return this.day
    }
    // Установить день публикации
    set _day(value) {
        if(isNaN(value) || value.length != 2){
            this.day = 'undefined'
        }
        else{
            this.day = String(value)
        }
    }
    // Получить месяц публикации
    get _month(){
        return this.month
    }
    // Установить месяц публикации
    set _month(value) {
        if(isNaN(value) || value.length != 2){
            this.month = 'undefined'
        }
        else{
            this.month = String(value)
        }
    }
    // Получить год публикации
    get _year(){
        return this.year
    }
    // Установить год публикации
    set _year(value) {
        if(isNaN(value) || value.length != 4){
            this.year = 'undefined'
        }
        else{
            this.year = String(value)
        }
    }
    // Получить время публикации
    get _time(){
        return this.time
    }
    // Установить время публикации
    set _time(value) {
        if(value.length == 5){
            value = value.split(':')
            if((isNaN(value[0]) || value[0].length != 2)|| (isNaN(value[1])|| value[1].length != 2)){
                this.time = 'undefined'
            }
            else{
                value = value.join(':')
                this.time = String(value)
            }
        }
        else{
            this.time = 'undefined'
        }
    }
}
// Получатель
class Recipient{
    constructor(_id, _address){
        this._id = _id
        this._address = _address
    }
    // Получить id получателя
    get _id(){
        return this.id
    }
    // Установить id получателя
    set _id(value) {
        try{
            if(isNaN(value)){
                this.id = 'undefined'
            }
            else{
                this.id = Number(value)
            }
        }catch (e) {
            this.id = 'undefined'
        }
    }
    // Получить имя получателя
    get _address(){
        return this.address
    }
    // Установить получателя
    set _address(value) {
        this.address = String(value)
    }
}
// Массив получателей
class ArrayRecipients{
    recipients=[]
    // Получить массив публикации
    get _recipients(){
        return this.recipients
    }
    // Установить масиив публикации
    set _recipients(value) {
        this.recipients.push(value)
    }
    // Функция поиска в массиве объектов
    Search(text){
        let newObj = new ArrayRecipients()
        let flag = false
        text = String(text)
        try{
            for(let i in this._recipients){
                try{
                    if(text.toLowerCase() == this._recipients[i]._address.toLowerCase()){
                        newObj._recipients.push(this._recipients[i])
                        flag = true
                    }
                    else if(this._recipients[i]._address.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._recipients.push(this._recipients[i])
                        flag = true
                    }
                }catch (e) {
                    console.log('Error:\n'+e)
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
        finally {
            if(flag){
                return newObj
            }
            else{
                return null
            }
        }
    }
    // Функция сортировки
    Sort(sortProperty, order){
        try{
            if(order == 'increasing'){
                if(sortProperty == 'address'){
                    this._recipients.sort((prev, next) => prev._address.localeCompare(next._address))
                }
            }
            else if(order == 'decreasing'){
                if(sortProperty == 'address'){
                    this._recipients.sort((prev, next) => next._address.localeCompare(prev._address))
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
    }
}
// Устройство/Канал
class Device{
    // Конструктор
    constructor(_id, _name='undefined', _description='undefined', _status=undefined, _publications=undefined){
        this._id = _id
        this._name = _name
        this._description = _description
        this._status = _status
        this._publications = _publications
    }
    // Получить id устройства/канала
    get _id(){
        return this.id
    }
    // Установить id устройства/канала
    set _id(value) {
        try{
            if(isNaN(value)){
                this.id = 'undefined'
            }
            else{
                this.id = Number(value)
            }
        }catch (e) {
            this.id = 'undefined'
        }
    }
    // Получить имя устройства/канала
    get _name(){
        return this.name
    }
    // Установить имя устройства/канала
    set _name(value) {
        this.name = String(value)
    }
    // Получить описание устройства/канала
    get _description(){
        return this.description
    }
    // Установить описание устройства/канала
    set _description(value) {
        this.description = String(value)
    }
    // Получить статус устройства/канала
    get _status(){
        return this.status
    }
    // Установить статус устройства/канала
    set _status(value) {
        this.status = value
    }
    // Получить публикации устройства/канала
    get _publications(){
        return this.publications
    }
    // Установить публикации устройства/канала
    set _publications(value) {
        this.publications = value
    }
}
// Массив устройств/каналов
class ArrayDevices{
    devices=[]
    // Получить массив публикации
    get _devices(){
        return this.devices
    }
    // Установить масиив публикации
    set _devices(value) {
        this.devices.push(value)
    }
    // Функция поиска в массиве объектов
    Search(text){
        let newObj = new ArrayDevices()
        let flag = false
        text = String(text)
        try{
            for(let i in this._devices){
                try{
                    if(text.toLowerCase() == this._devices[i]._name.toLowerCase()){
                        newObj._devices.push(this._devices[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._devices[i]._description.toLowerCase()) {
                        newObj._devices.push(this._devices[i])
                        flag = true
                    }
                    else if(this._devices[i]._name.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._devices.push(this._devices[i])
                        flag = true
                    }
                    else if(this._devices[i]._description.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._devices.push(this._devices[i])
                        flag = true
                    }
                }catch (e) {
                    console.log('Error:\n'+e)
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
        finally {
            if(flag){
                return newObj
            }
            else{
                return null
            }
        }
    }
    // Функция сортировки
    Sort(sortProperty, order){
        try{
            if(order == 'increasing'){
                if(sortProperty == 'name'){
                    this._devices.sort((prev, next) => prev._name.localeCompare(next._name))
                }
                else if(sortProperty == 'description'){
                    this._devices.sort((prev, next) => prev._description.localeCompare(next._description))
                }
                else if(sortProperty == 'status'){
                    this._devices.sort.sort((prev, next) => prev._status - next._status);
                }
            }
            else if(order == 'decreasing'){
                if(sortProperty == 'name'){
                    this._devices.sort((prev, next) => next._name.localeCompare(prev._name))
                }
                else if(sortProperty == 'description'){
                    this._devices.sort((prev, next) => next._description.localeCompare(prev._description))
                }
                else if(sortProperty == 'status'){
                    this._devices.sort.sort((prev, next) => next._status - prev._status);
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
    }
}
// Плейлист
class Playlist{
    // Конструктор
    constructor(_id, _name, _description, _status, _content){
        this._id = _id
        this._name = _name
        this._description = _description
        this._status = _status
        this._content = _content
    }
    // Получить id плейлиста
    get _id(){
        return this.id
    }
    // Установить id плейлиста
    set _id(value) {
        try{
            if(isNaN(value)){
                this.id = 'undefined'
            }
            else{
                this.id = Number(value)
            }
        }catch (e) {
            this.id = 'undefined'
        }
    }
    // Получить имя плейлиста
    get _name(){
        return this.name
    }
    // Установить имя плейлиста
    set _name(value) {
        this.name = String(value)
    }
    // Получить описание устройства/канала
    get _description(){
        return this.description
    }
    // Установить описание устройства/канала
    set _description(value) {
        this.description = String(value)
    }
    // Получить статус устройства/канала
    get _status(){
        return this.status
    }
    // Установить статус устройства/канала
    set _status(value) {
        this.status = value
    }
    // Получить массив контента
    get _content(){
        return this.content
    }
    // Установить масиив контента
    set _content(value) {
        this.content = value
    }
    // Добавить контент
    AddContent(idContent){
        try{
            let newObj = {'id': idContent}
            this._content.push(newObj)
        }catch (e) {
            console.log(idContent)
        }
    }
    // Удалить контент
    DellContent(idContent){
        try{
            if(isNaN(idContent)){
                return this._content
            }
            else{
                let newObj = []
                for(let i in this._content){
                    if(idContent != i){
                        newObj.push(this._content[i])
                    }
                }
                return newObj
            }
        }catch (e) {
            return this._content
        }

    }
}
// Массив плейлистов
class ArrayPlaylist{
    playlists=[]
    // Получить массив публикации
    get _playlists(){
        return this.playlists
    }
    // Установить масиив публикации
    set _playlists(value) {
        this.playlists.push(value)
    }
    // Функция поиска в массиве объектов
    Search(text){
        let newObj = new ArrayPlaylist()
        let flag = false
        text = String(text)
        try{
            for(let i in this._playlists){
                try{
                    if(text.toLowerCase() == this._playlists[i]._name.toLowerCase()){
                        newObj._playlists.push(this._playlists[i])
                        flag = true
                    }
                    else if(text.toLowerCase() == this._playlists[i]._description.toLowerCase()) {
                        newObj._playlists.push(this._playlists[i])
                        flag = true
                    }
                    else if(this._playlists[i]._name.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._playlists.push(this._playlists[i])
                        flag = true
                    }
                    else if(this._playlists[i]._description.toLowerCase().startsWith(text.toLowerCase())){
                        newObj._playlists.push(this._playlists[i])
                        flag = true
                    }
                }catch (e) {
                    console.log('Error:\n'+e)
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
        finally {
            if(flag){
                return newObj
            }
            else{
                return null
            }
        }
    }
    // Функция сортировки
    Sort(sortProperty, order){
        try{
            if(order == 'increasing'){
                if(sortProperty == 'name'){
                    this._playlists.sort((prev, next) => prev._name.localeCompare(next._name))
                }
                else if(sortProperty == 'description'){
                    this._playlists.sort((prev, next) => prev._description.localeCompare(next._description))
                }
                else if(sortProperty == 'status'){
                    this._playlists.sort.sort((prev, next) => prev._status - next._status);
                }
            }
            else if(order == 'decreasing'){
                if(sortProperty == 'name'){
                    this._playlists.sort((prev, next) => next._name.localeCompare(prev._name))
                }
                else if(sortProperty == 'description'){
                    this._playlists.sort((prev, next) => next._description.localeCompare(prev._description))
                }
                else if(sortProperty == 'status'){
                    this._playlists.sort.sort((prev, next) => next._status - prev._status);
                }
            }
        }catch (e) {
            console.log('Error:\n'+e)
        }
    }
}
// Публикация плейлиста
class PlaylistPublication extends Playlist{
    // Конструктор
    constructor(_id, _name, _description, _status, _content, _device=undefined){
        super(_id, _name, _description, _status, _content);
        this._device = _device
    }
    // Получить массив устройств
    get _device(){
        return this.device
    }
    // Установить масиив устройств
    set _device(value) {
        this.device.push(value)
    }
}
// Адреса обращений
class DataURL{
    // Url получателей
    _recipient = 'http://192.168.253.9:8080/Json/recipient' + '?nocahe='+(new Date()).getTime()
    get _recipient(){
        return this._recipient
    }
    // URL устройств метода GET
    _SMSDeviceGet = 'http://192.168.253.9:8080/Json/SMSDevice' + '?nocahe='+(new Date()).getTime()
    _EmailDeviceGet = 'http://192.168.253.9:8080/Json/EmailDevice'+ '?nocahe='+(new Date()).getTime()
    _ScoreboardDeviceGet = 'http://192.168.253.9:8080/Json/ScoreboardDevice'+ '?nocahe='+(new Date()).getTime()
    _SpeakersDeviceGet = 'http://192.168.253.9:8080/Json/SpeakersDevice'+ '?nocahe='+(new Date()).getTime()
    get _SMSDeviceGet(){
        return this._SMSDeviceGet
    }
    get _EmailDeviceGet(){
        return this._EmailDeviceGet
    }
    get _ScoreboardDeviceGet(){
        return this._ScoreboardDeviceGet
    }
    get _SpeakersDeviceGet(){
        return this._SpeakersDeviceGet
    }
    // URL устройств метода POST
    _SmsMessage = 'http://192.168.253.9:8080/Json/SmsMessage'+ '?nocahe='+(new Date()).getTime()
    _EmailDevice = 'http://192.168.253.9:8080/Json/EmailDevice'+ '?nocahe='+(new Date()).getTime()
    _ScoreboardDevice = 'http://192.168.253.9:8080/Json/ScoreboardDevice'+ '?nocahe='+(new Date()).getTime()
    _SpeakersDevice = 'http://192.168.253.9:8080/Json/SpeakersDevice'+ '?nocahe='+(new Date()).getTime()
    get _SmsMessage(){
        return this._SmsMessage
    }
    get _EmailDevice(){
        return this._EmailDevice
    }
    get _ScoreboardDevice(){
        return this._ScoreboardDevice
    }
    get _SpeakersDevice(){
        return this._SpeakersDevice
    }
    // URL плейлистов метода GET
    _SMSPlaylistGet = 'http://192.168.253.9:8080/Json/PlaylistDeviceSms'+ '?nocahe='+(new Date()).getTime()
    _EmailPlaylistGet = 'http://192.168.253.9:8080/Json/PlaylistDeviceEmail'+ '?nocahe='+(new Date()).getTime()
    _ScoreboardPlaylistGet = 'http://192.168.253.9:8080/Json/PlaylistDeviceScoreboard'+ '?nocahe='+(new Date()).getTime()
    _SpeakersPlaylistGet = 'http://192.168.253.9:8080/Json/PlaylistDeviceSpeakers'+ '?nocahe='+(new Date()).getTime()
    get _SMSPlaylistGet(){
        return this._SMSPlaylistGet
    }
    get _EmailPlaylistGet(){
        return this._EmailPlaylistGet
    }
    get _ScoreboardPlaylistGet(){
        return this._ScoreboardPlaylistGet
    }
    get _SpeakersPlaylistGet(){
        return this._SpeakersPlaylistGet
    }
    // URL плейлистов метода POST
    _SMSPlaylistPost = 'http://192.168.253.9:8080/Json/PlaylistDeviceSms'+ '?nocahe='+(new Date()).getTime()
    _EmailPlaylistPost = 'http://192.168.253.9:8080/Json/PlaylistDeviceEmail'+ '?nocahe='+(new Date()).getTime()
    _ScoreboardPlaylistPost = 'http://192.168.253.9:8080/Json/PlaylistDeviceScoreboard'+ '?nocahe='+(new Date()).getTime()
    _SpeakersPlaylistPost = 'http://192.168.253.9:8080/Json/PlaylistDeviceSpeakers'+ '?nocahe='+(new Date()).getTime()
    get _SMSPlaylistPost(){
        return this._SMSPlaylistPost
    }
    get _EmailPlaylistPost(){
        return this._EmailPlaylistPost
    }
    get _ScoreboardPlaylistPost(){
        return this._ScoreboardPlaylistPost
    }
    get _SpeakersPlaylistGet(){
        return this._SpeakersPlaylistPost
    }
    // URL контента метода GET
    _SMSContentGet = 'http://192.168.253.9:8080/Json/ContentDeviceSmsGet'+ '?nocahe='+(new Date()).getTime()
    _EmailContentGet = 'http://192.168.253.9:8080/Json/ContentEmailDeviceGet'+ '?nocahe='+(new Date()).getTime()
    _ScoreboardContentGet = 'http://192.168.253.9:8080/Json/ContentScoreboardDeviceGet'+ '?nocahe='+(new Date()).getTime()
    _SpeakersContentGet = 'http://192.168.253.9:8080/Json/ContentSpeakersDeviceGet'+ '?nocahe='+(new Date()).getTime()
    get _SMSContentGet(){
        return this._SMSContentGet
    }
    get _EmailContentGet(){
        return this._EmailContentGet
    }
    get _ScoreboardContentGet(){
        return this._ScoreboardContentGet
    }
    get _SpeakersContentGet(){
        return this._SpeakersContentGet
    }
    // URL контента метода POST
    _SMSContentPost = 'http://192.168.253.9:8080/Json/ContentDeviceSmsPost'+ '?nocahe='+(new Date()).getTime()
    _EmailContentPost = 'http://192.168.253.9:8080/Json/ContentEmailDevice'+ '?nocahe='+(new Date()).getTime()
    _ScoreboardContentPost = 'http://192.168.253.9:8080/Json/ContentScoreboardDevice'+ '?nocahe='+(new Date()).getTime()
    _SpeakersContentPost = 'http://192.168.253.9:8080/Json/ContentSpeakersDevice'+ '?nocahe='+(new Date()).getTime()
    get _SMSContentPost(){
        return this._SMSContentPost
    }
    get _EmailContentPost(){
        return this._EmailContentPost
    }
    get _ScoreboardContentPost(){
        return this._ScoreboardContentPost
    }
    get _SpeakersContentPost(){
        return this._SpeakersContentPost
    }

}
