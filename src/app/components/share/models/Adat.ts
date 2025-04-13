export interface Felhasznalo{
    name: {
        fistname: string;
        lastname: string;
    };
    email: string;
    password: string;
}

export interface Munka {
    id: number;
    munkahelyszin: string;
    munkaNeve: string;          
    munkaLeiras: string;        
    munkaber?: string;               
    munkaelvarasok?: string[];       
    munkajelentkezesiHatarido?: string; 
    munkakapcsolat?: string;         
    munkaido?: string;          
    munkacegNeve?: string;               
    munkafoto?: string;
    surgosmunkaeroKell: boolean;              
}
