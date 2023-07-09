import { Component} from '@angular/core';
@Component({
  selector: 'app-register-est',
  templateUrl: './register-est.page.html',
  styleUrls: ['./register-est.page.scss'],
})


export class RegisterEstPage{

public selectedCategory = {
    name: 'RESORT',
    form: 'resortForm'
}

public newCat =
  {name: '', form: ''}
      
  
  categories = [
    { name: 'RESORT', form: 'resortForm' },
    { name: 'ESTABLISHMENTS', form: 'establishmentsForm' },
    { name: 'HERITAGE', form: 'heritageForm' }
  ];
  
  resortForm = {  

    pools: '',
    rooms: '',
    ac: '',
    activities: '',
    from: '',
    to: '',
    description: '',
    photos: '',
    cert: '',

    // Define fields for resort form
    // Example: name: string, email: string, etc.
  };

  establishmentsForm = {
    // Define fields for establishments form
  };

  heritageForm = {
    // Define fields for heritage form
  };

  constructor() {}
  

  onCategoryChange(){
    // Reset the form fields based on the selected category

   /*  this.selectedCategory = {
      name:this.selectedCategory.name ,
      form:this.selectedCategory.form
    } */ 
  }

  onSubmit() {
    // Handle form submission based on the selected category
    switch (this.selectedCategory.name) {
      case "RESORT":
        // Handle resort form submission
        break;
      case "ESTABLISHMENTS":
        // Handle establishments form submission
        break;
      case "HERITAGE":
        // Handle heritage form submission
        break;
      default:
        alert(this.selectedCategory.name);
        break;
    }
  }
}
