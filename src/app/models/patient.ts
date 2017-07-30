/**
 * Created by vasil_00ktv53 on 4/10/2017.
 */
export class Patient {
  id:number;
  email:string;
  fullName:string;
  enabled:boolean;
  nrOfCases:number;
  role:string;
  sex:boolean;
  age:number;
  professionDetails:string;


  constructor(id: number, email: string, fullName: string, enabled: boolean, nrOfCases: number, role: string, sex: boolean, age: number, professionDetails: string) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.enabled = enabled;
    this.nrOfCases = nrOfCases;
    this.role = role;
    this.sex = sex;
    this.age = age;
    this.professionDetails = professionDetails;
  }
}
