import constants from '../constants'
import service from '../service'
import adminTable from '../Table'

const patternEmail:RegExp = /[A-z]+\@[A-z]+\.[A-z]{2,5}/

export default class AddForm{
    private isCorrectlyEmail:boolean = false
    private isCorrectlyAge:boolean = false
    private isReadyName:boolean = false
    private isReadySurname:boolean = false

    constructor(){
        this.checkEmail()
        this.checkAge()
        this.checkName()
        this.checkSurname()
        this.addUser()
    }

    checkEmail(){
        constants.inputEmail.addEventListener('input', (e) =>{
            const target:HTMLInputElement = e.currentTarget as HTMLInputElement 
            this.isCorrectlyEmail = patternEmail.test(target.value)
            target.style.borderColor = this.isCorrectlyEmail ? 'initial' : 'red'
        })
    }

    checkAge(){
        constants.inputAge.addEventListener('input', (e) => {
            const target:HTMLInputElement = e.currentTarget as HTMLInputElement
            const age:number = parseInt(target.value)
            this.isCorrectlyAge = age > 0
            target.style.borderColor = this.isCorrectlyAge ? 'initial' : 'red'
        })
    }

    checkName(){
        constants.inputName.addEventListener('input', (e) => {
            const target:HTMLInputElement = e.currentTarget as HTMLInputElement
            this.isReadyName = !!target.value.length //for example, equal length > 0
            target.style.borderColor = this.isReadyName ? 'initial' : 'red'
        })
    }

    checkSurname(){
        constants.inputSurname.addEventListener('input', (e) => {
            const target: HTMLInputElement = e.currentTarget as HTMLInputElement
            this.isReadySurname = target.value.length > 0 
            target.style.borderColor = this.isReadySurname ? 'initial' : 'red'
        }) 
    }

    addUser(){
        constants.btnAdd.addEventListener('click', (e) => {
            e.preventDefault()

            if(this.isCorrectlyEmail && this.isCorrectlyAge &&
                this.isReadyName && this.isReadySurname){
                    const email:string = constants.inputEmail.value
                    const name:string = constants.inputName.value
                    const surname:string = constants.inputSurname.value
                    const age:number = parseInt(constants.inputAge.value)
                    const phone:string = constants.inputPhone.value
                    const hobby:string = constants.inputHobby.value
                    const work:string = constants.inputWork.value

                    service.addUser({
                        email,
                        name,
                        surname,
                        age,
                        phone,
                        hobby,
                        work
                    })

                    constants.inputEmail.value = ""
                    constants.inputName.value = ""
                    constants.inputSurname.value = ""
                    constants.inputAge.value = ""
                    constants.inputPhone.value = ""
                    constants.inputHobby.value = ""
                    constants.inputWork.value = ""

                    adminTable.renderUsers(service.getUsers)
                }
            
        })
    }
}