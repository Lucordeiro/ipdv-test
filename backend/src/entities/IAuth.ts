export class IAuth {

   
    public name     : string;
    public login    : string;
    public password : string;


    constructor(props: IAuth){
        this.name = props.name;
        this.login = props.login;
        this.password = props.password;
    }
    
}