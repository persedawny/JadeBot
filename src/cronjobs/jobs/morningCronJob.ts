import { CustomCronJob } from "../customCronJob";

export default class extends CustomCronJob{
    constructor(){
        super('00', '00', '9', func)
    }
}

function func() {
    console.log("asdbhasdlkiasd");
}