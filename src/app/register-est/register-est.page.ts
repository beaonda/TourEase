import { Component, inject} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-register-est',
  templateUrl: './register-est.page.html',
  styleUrls: ['./register-est.page.scss'],
})


export class RegisterEstPage{
  showDays: boolean = false; // Initialize showDays property to false
  ContactForm:any;
  locAd1:any;
  locAd2:any;
  locBgy:any;
  locCity:any;
  locPosCode:any;
  locProvince:any = "Batangas";
  monday:any = false;
  tuesday:any = false;
  wednesday:any = false;
  thursday:any = false;
  friday:any = false;
  saturday:any = false;
  sunday:any = false;
  image:any;
  estRegForm:any;
  public lname:any;
  public fname:any;
  public mname:any;
  public contact:any;
  public email:any;
  public buname:any;
  public bpword:any;
  public bpword2:any;
  public est_name:any;
  public pos:any;
  public est_loc:any;
  public oh_from:any;
  public oh_to:any;
  public ex_link:any;
  public b_email:any;
  public reg_status:any;
  estab:any;
  estabItem:any;
  contact_name:any;
  contact_email:any;
  contact_number:any;
  contact_pos:any;
  valid:any;

  saveOp(data:any){
    let operationData = {
      est_id:data.id,
      timeFrom:this.oh_from,
      timeTo:this.oh_to,
      mon:this.monday,
      tue:this.tuesday,
      wed:this.wednesday,
      thu:this.thursday,
      fri:this.friday,
      sat:this.saturday,
      sun:this.sunday
    }
    this.fireService.saveOperations(operationData).then(
      res=>{
        alert("Added to OH");
        console.log(res);
        this.router.navigate(['/tab1']);
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    );
  }

  saveContacts(data:any){
    let contactData = {
      est_id:data.id,
      contact_name:this.contact_name,
      contact_email:this.contact_email,
      contact_number:this.contact_number,
      contact_pos:this.contact_pos,
    }
    this.fireService.saveContacts(contactData).then(
      res=>{
        alert("Successfully Added");
        console.log(res);
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    ); 
  }

  saveResort(data:any){
    let resortData = {
      est_id: data.id,
      no_of_rooms: this.resortForm.rooms,
      no_of_pools: this.resortForm.pools,
      airconditioned: this.resortForm.ac,
      activities: this.resortForm.activities,
    }
    this.fireService.saveResortInfo(resortData).then(
      res=>{
        alert("Successfully Added Resort Info");
        console.log(res);
        this.saveOp(data);
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    ); 
  }



registerEst(valid:any){

  if(valid){
    alert("Please make sure all the inputs are valid");
    console.log("Invalid");
  } else {
    var dateNow = new Date();
  var hour = dateNow.getHours();
  var minutes = dateNow.getMinutes();
  var year = dateNow.getFullYear();
  var date = dateNow.getDay();
  var month = dateNow.getMonth();

  let data = {
    id: this.firestore.createId(),
    user_lname:this.lname,
    user_fname:this.fname,
    user_mname:this.mname,
    user_email:this.email,
    user_contact:this.contact,
    bus_exlink:this.ex_link,
    bus_email:this.email,
    bus_username:this.buname,
    bus_pword:this.bpword,
    bus_name:this.est_name,
    user_pos:this.pos,
    bus_add1:this.locAd1,
    bus_add2:this.locAd2,
    bus_brgy:this.locBgy,
    bus_city:this.locCity,
    bus_province: "Batangas",
    bus_category: this.selectedCategory.name,
    bus_rates: this.resortForm.from,
    bus_desc: this.resortForm.description,
    bus_regHour: hour,
    bus_regMins: minutes,
    bus_regDate: date,
    bus_regMonth: month,
    bus_regYear: year,
    bus_regStatus: false,
  }
  
  this.fireService.saveEstDetails(data).then(
    res=>{
      alert("Successfully Added");
      this.saveResort(data);
    }, err=> {
      alert(err.message);
      console.log(err);
    }
  )
  }
}

constructor(
  public router:Router, 
  private alertController: AlertController, 
  public fireService: FireserviceService,
  public firestore: AngularFirestore, 
  public storage: Storage,
 ) 
  {

  }

  //
async takePicture() {
  try {
    if(Capacitor.getPlatform() !='web') await Camera.requestPermissions();
    const image = await Camera.getPhoto({
      quality: 90,
      //allowEditing:false,
      source:CameraSource.Prompt,
      width:600,
      resultType:CameraResultType.DataUrl
    });
    console.log('image',image);
    this.image=image.dataUrl;
    const blob=this.dataURLtoBlob(image.dataUrl);
    const url = await this.uploadImage(blob,image);
    console.log(url); 
  } catch(e) {
    console.log(e);
  } 
}

dataURLtoBlob(dataurl:any) {
  var arr = dataurl.split(','), mime=arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n= bstr.length, u8arr =new Uint8Array(n);
  while(n--){
      u8arr[n]=bstr.charCodeAt(n);
  }
  return new Blob([u8arr],{type:mime});
}

async uploadImage(blob: any, imageData:any) {
  try { 
    const currentDate = Date.now();
    const filePath = 'estImages/${currentDate}.${imageData.format}';
    const fileRef =  ref(this.storage, filePath);
    const task = await uploadBytes (fileRef, blob);
    console.log('task: ', task);
    const url = getDownloadURL(fileRef);
    return url;
  } catch (e) {
    throw(e);
  } 
}

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

  times = [
    {value: '00:00'},
    {value: '01:00'},
    {value: '02:00'},
    {value: '03:00'},
    {value: '04:00'},
    {value: '05:00'},
    {value: '06:00'},
    {value: '07:00'},
    {value: '08:00'},
    {value: '09:00'},
    {value: '10:00'},
    {value: '11:00'},
    {value: '12:00'},
    {value: '13:00'},
    {value: '14:00'},
    {value: '15:00'},
    {value: '16:00'},
    {value: '17:00'},
    {value: '18:00'},
    {value: '19:00'},
    {value: '20:00'},
    {value: '21:00'},
    {value: '22:00'},
    {value: '23:00'},
    {value: '24:00'}
  ]

  rates = [
    {value: '>500'},
    {value: '500 - 1,000'},
    {value: '1,000 - 2,000'},
    {value: '2,000 - 3,500'},
    {value: '3,500 - 5,000'},
    {value: '5,000 - 7,000'},
    {value: '7,000 - 10,000'},
    {value: '10,000 - 12,000'},
    {value: '12,000 - 15,000'},
  ]
  
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


  

  onCategoryChange(){
    // Reset the form fields based on the selected category

   /*  this.selectedCategory = {
      name:this.selectedCategory.name ,
      form:this.selectedCategory.form
    } */ 
  }

  showContact = false;
  addContact(){
    this.showContact = !(this.showContact);
  }
  chosenCity:any;

  changeBgy(){  
    switch(this.locCity){
      case 'Agoncillo':
        this.chosenCity = this.agoncillo;
        break;
      case 'Alitagtag':
        this.chosenCity = this.alitagtag;
        break;
      case 'Balayan':
        this.chosenCity = this.balayan;
        break;
      case 'Balete':
        this.chosenCity = this.balete;
        break;
      case 'Batangas City':
        this.chosenCity = this.batangascity;
        break;
      case 'Bauan':
        this.chosenCity = this.bauan;
        break;
      case 'Calaca':
        this.chosenCity = this.calaca;
        break;
      case 'Calatagan':
        this.chosenCity = this.calatagan;
        break;
      case 'Cuenca':
        this.chosenCity = this.cuenca;
        break;
      case 'Ibaan':
        this.chosenCity = this.ibaan;
        break;
      case 'Laurel':
        this.chosenCity = this.laurel;
        break;
      case 'Lemery':
        this.chosenCity = this.lemery;
        break;
      case 'Lian':
        this.chosenCity = this.lian;
        break;
      case 'Lipa':
        this.chosenCity = this.lipa;
        break;
      case 'Lobo':
        this.chosenCity = this.lobo;
        break;
      case 'Mabini':
        this.chosenCity = this.mabini;
        break;
      case 'Malvar':
        this.chosenCity = this.malvar;
        break;
      case 'Mataasnakahoy':
        this.chosenCity = this.mataasnakahoy;
        break;
      case 'Nasugbu':
        this.chosenCity = this.nasugbu;
        break;
      case 'Padre Garcia':
        this.chosenCity = this.padregarcia;
        break;
      case 'Rosario':
        this.chosenCity = this.rosario;
        break;
      case 'San Jose':
        this.chosenCity = this.sanjose;
        break;
      case 'San Juan':
        this.chosenCity = this.sanjuan;
        break;
      case 'San Luis':
        this.chosenCity = this.sanluis;
        break;
      case 'San Nicolas':
        this.chosenCity = this.sannicolas;
        break;
      case 'San Pascual':
        this.chosenCity = this.sanpascual;
        break;
      case 'Santa Teresita':
        this.chosenCity = this.santateresita;
        break;
      case 'Santo Tomas':
        this.chosenCity = this.santotomas;
        break;
      case 'Taal':
        this.chosenCity = this.taal;
        break;
      case 'Talisay':
        this.chosenCity = this.talisay;
        break;
      case 'Tanauan':
        this.chosenCity = this.tanauan;
        break;
      case 'Taysan':
        this.chosenCity = this.taysan;
        break;
      case 'Tingloy':
        this.chosenCity = this.tingloy;
        break;
      case 'Tuy':
        this.chosenCity = this.tuy;
        break;
      default:
        alert("Could not find chosen city/municipality");
        break;
    }
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


  batangasCities = [
    {name: 'Agoncillo'},
    {name: 'Alitagtag'},
    {name: 'Balayan'},
    {name: 'Balete'},
    {name: 'Batangas City'},
    {name: 'Bauan'},
    {name: 'Calaca'},
    {name: 'Calatagan'},
    {name: 'Cuenca'},
    {name: 'Ibaan'},
    {name: 'Laurel'},
    {name: 'Lemery'},
    {name: 'Lian'},
    {name: 'Lipa'},
    {name: 'Lobo'},
    {name: 'Mabini'},
    {name: 'Malvar'},
    {name: 'Mataasnakahoy'},
    {name: 'Nasugbu'},
    {name: 'Padre Garcia'},
    {name: 'Rosario'},
    {name: 'San Jose'},
    {name: 'San Juan'},
    {name: 'San Luis'},
    {name: 'San Nicolas'},
    {name: 'San Pascual'},
    {name: 'Santa Teresita'},
    {name: 'Santo Tomas'},
    {name: 'Taal'},
    {name: 'Talisay'},
    {name: 'Tanauan'},
    {name: 'Taysan'},
    {name: 'Tingloy'},
    {name: 'Tuy'},
  ]

  agoncillo = [
    {name:'Adia'},
    {name:'Bagong Sikat'},
    {name:'Balangon'},
    {name:'Bangin'},
    {name:'Banyaga'},
    {name:'Barigon'},
    {name:'Bilibinwang'},
    {name:'Coral na Munti'},
    {name:'Guitna'},
    {name:'Mabini'},
    {name:'Pamiga'},
    {name:'Panhulan'},
    {name:'Pansipit'},
    {name:'Poblacion'},
    {name:'Pook'},
    {name:'San Jacinto'},
    {name:'San Teodoro'},
    {name:'Santa Cruz'},
    {name:'Santo Tomas'},
    {name:'Subic Ibaba'},
    {name:'Subic Ilaya'},
  ]

  alitagtag = [
    {name: 'Balagbag'},
    {name: 'Concepcion'},
    {name: 'Concordia'},
    {name: 'Dalipit East'},
    {name: 'Dalipit West'},
    {name: 'Dominador East'},
    {name: 'Dominador West'},
    {name: 'Munlawin'},
    {name: 'Muzon Primero'},
    {name: 'Muzon Segundo'},
    {name: 'Pinagkrusan'},
    {name: 'Ping-As'},
    {name: 'Poblacion East'},
    {name: 'Poblacion West'},
    {name: 'Salvador Agito'},
    {name: 'San Jose'},
    {name: 'San Juan'},
    {name: 'Santa Cruz'},
    {name: 'Tadlac'},
  ]

  balayan = [
    {name: 'Baclaran'},
    {name: 'Barangay 1'},
    {name: 'Barangay 2'},
    {name: 'Barangay 3'},
    {name: 'Barangay 4'},
    {name: 'Barangay 5'},
    {name: 'Barangay 6'},
    {name: 'Barangay 7'},
    {name: 'Barangay 8'},
    {name: 'Barangay 9'},
    {name: 'Barangay 10'},
    {name: 'Barangay 11'},
    {name: 'Barangay 12'},
    {name: 'Calan'},
    {name: 'Caloocan'},
    {name: 'Calzada'},
    {name: 'Canda'},
    {name: 'Carenahan'},
    {name: 'Caybunga'},
    {name: 'Cayponce'},
    {name: 'Dalig'},
    {name: 'Dao'},
    {name: 'Dilao'},
    {name: 'Duhatan'},
    {name: 'Durungao'},
    {name: 'Gimalas'},
    {name: 'Gumamela'},
    {name: 'Lagnas'},
    {name: 'Lanatan'},
    {name: 'Langgangan'},
    {name: 'Lucban Putol'},
    {name: 'Lucban Pook'},
    {name: 'Magabe'},
    {name: 'Malalay'},
    {name: 'Munting Tubig'},
    {name: 'Navotas'},
    {name: 'Patugo'},
    {name: 'Palikpikan'},
    {name: 'Pooc'},
    {name: 'Sambat'},
    {name: 'Sampaga'},
    {name: 'San Juan'},
    {name: 'San Piro'},
    {name: 'Santol'},
    {name: 'Sukol'},
    {name: 'Tactac'},
    {name: 'Taludtud'},
    {name: 'Tanggoy'}
  ]

  balete = [
    {name: 'Alangilan'},
    {name: 'Calawit'},
    {name: 'Looc'},
    {name: 'Magapi'},
    {name: 'Makina'},
    {name: 'Malabanan'},
    {name: 'Paligawan'},
    {name: 'Palsara'},
    {name: 'Poblacion'},
    {name: 'Sala'},
    {name: 'Sampalocan'},
    {name: 'Solis'},
    {name: 'San Sebastian'},
  ]

  batangascity = [
    {name : 'Alangilan'},
    {name : 'Balagtas'},
    {name : 'Balete'},
    {name : 'Banaba Center'},
    {name : 'Banaba Ibaba'},
    {name : 'Banaba Kanluran'},
    {name : 'Banaba Silangan'},
    {name: 'Barangay 1'},
    {name: 'Barangay 2'},
    {name: 'Barangay 3'},
    {name: 'Barangay 4'},
    {name: 'Barangay 5'},
    {name: 'Barangay 6'},
    {name: 'Barangay 7'},
    {name: 'Barangay 8'},
    {name: 'Barangay 9'},
    {name: 'Barangay 10'},
    {name: 'Barangay 11'},
    {name: 'Barangay 12'},
    {name : 'Barangay 13'},
    {name : 'Barangay 14'},
    {name : 'Barangay 15'},
    {name : 'Barangay 16'},
    {name : 'Barangay 17'},
    {name : 'Barangay 18'},
    {name : 'Barangay 19'},
    {name : 'Barangay 20'},
    {name : 'Barangay 21'},
    {name : 'Barangay 22'},
    {name : 'Barangay 23'},
    {name : 'Barangay 24'},
    {name : 'Bilogo'},
    {name : 'Bolbok'},
    {name : 'Bukal'},
    {name : 'Calicanto'},
    {name : 'Catandala'},
    {name : 'Concepcion'},
    {name : 'Conde Itaas'},
    {name : 'Conde Labak'},
    {name : 'Cuta'},
    {name : 'Dalig'},
    {name : 'Dela Paz'},
    {name : 'Dela Paz Pulot Aplaya'},
    {name : 'Dela Paz Pulot Itaas'},
    {name : 'Dumoclay'},
    {name : 'Dumantay'},
    {name : 'Gulod Itaas'},
    {name : 'Gulod Labak'},
    {name : 'Haligue Kanluran'},
    {name : 'Haligue Silangan'},
    {name : 'Ilihan'},
    {name : 'Kumba'},
    {name : 'Kumintang Ibaba'},
    {name : 'Kumintang Ilaya'},
    {name : 'Libjo'},
    {name : 'Liponpon Isla Verde'},
    {name : 'Maapas'},
    {name : 'Mabacong'},
    {name : 'Mahabang Dalig'},
    {name : 'Mahabang Parang'},
    {name : 'Mahacot Kanluran'},
    {name : 'Mahacot Silangan'},
    {name : 'Malalim'},
    {name : 'Malibayo'},
    {name : 'Malitam'},
    {name : 'Maruclap'},
    {name : 'Pagkilatan'},
    {name : 'Paharang Kanluran'},
    {name : 'Paharang Silangan'},
    {name : 'Sampaga'},
    {name : 'San Agapito Isla Verde'},
    {name : 'San Agustin Kanluran Isla Verde'},
    {name : 'San Agustin Silangan Isla Verde'},
    {name : 'San Andres Isla Verde'},
    {name : 'San Antonio Isla Verde'},
    {name : 'San Isidro'},
    {name : 'San Jose Sico'},
    {name : 'San Miguel'},
    {name : 'San Pedro'},
    {name : 'Santa Clara'},
    {name : 'Santa Rita Aplaya'},
    {name : 'Santa Rita Karsada'},
    {name : 'Santo Domingo'},
    {name : 'Santo Nino'},
    {name : 'Simlong'},
    {name : 'Sirang Lupa'},
    {name : 'Sorosoro Ibaba'},
    {name : 'Sorosoro Ilaya'},
    {name : 'Sorosoro Karsada'},
    {name : 'Tabangao Ambulong'},
    {name : 'Tabangao Aplaya'},
    {name : 'Tabangao Dao'},
    {name : 'Talahib Pandayan'},
    {name : 'Talahib Payapa'},
    {name : 'Talumpok Kanluran'},
    {name : 'Talumpok Silangan'},
    {name : 'Tinga Itaas'},
    {name : 'Tinga Labak'},
    {name : 'Tulo'},
    {name : 'Wawa'},
  ]

  bauan = [
    {name : 'Alagao'},
    {name : 'Aplaya'},
    {name : 'As-Is'},
    {name : 'Bagong Silang'},
    {name : 'Baguilawa'},
    {name : 'Balayong'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Bolo'},
    {name : 'Colvo'},
    {name : 'Cupang'},
    {name : 'Durungao'},
    {name : 'Gulibay'},
    {name : 'Inicbulan'},
    {name : 'Locloc'},
    {name : 'Magalang-Galang'},
    {name : 'Malindig'},
    {name : 'Manalupang'},
    {name : 'Manghinao Proper'},
    {name : 'Manghinao Uno'},
    {name : 'New Danglayan'},
    {name : 'Orense'},
    {name : 'Pitugo'},
    {name : 'Rizal'},
    {name : 'Sampaguita'},
    {name : 'San Agustin'},
    {name : 'San Andres Proper'},
    {name : 'San Andres Uno'},
    {name : 'San Diego'},
    {name : 'San Miguel'},
    {name : 'San Pablo'},
    {name : 'San Pedro'},
    {name : 'San Roque'},
    {name : 'San Teodoro'},
    {name : 'San Vicente'},
    {name : 'Santa Maria'},
    {name : 'Santo Domingo'},
    {name : 'Sinala'},
  ]

  calaca = [
    {name : 'Bagong Tubig'},
    {name : 'Baclas'},
    {name : 'Balimbing'},
    {name : 'Bambang'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'Barangay 6'},
    {name : 'Bisaya'},
    {name : 'Cahil'},
    {name : 'Caluangan'},
    {name : 'Calantas'},
    {name : 'Camastilisan'},
    {name : 'Coral ni Lopez'},
    {name : 'Coral ni Bacal'},
    {name : 'Dacanlao'},
    {name : 'Dila'},
    {name : 'Loma'},
    {name : 'Lumbang Calzada'},
    {name : 'Lumbang na Bata'},
    {name : 'Lumbang na Matanda'},
    {name : 'Madalunot'},
    {name : 'Makina'},
    {name : 'Matipok'},
    {name : 'Munting Coral'},
    {name : 'Niyugan'},
    {name : 'Pantay'},
    {name : 'Puting Balo West'},
    {name : 'Puting Kahoy'},
    {name : 'Puting Bato East'},
    {name : 'Quisumbing'},
    {name : 'Salong'},
    {name : 'San Rafael'},
    {name : 'Sinisian'},
    {name : 'Taklang Anak'},
    {name : 'Talisay'},
    {name : 'Tamayo'},
    {name : 'Timbain'},
  ]

  calatagan = [
    {name : 'Bagong Silang'},
    {name : 'Baha'},
    {name : 'Balibago'},
    {name : 'Balitoc'},
    {name : 'Biga'},
    {name : 'Bucal'},
    {name : 'Carlosa'},
    {name : 'Carretunan'},
    {name : 'Encarnacion'},
    {name : 'Gulod'},
    {name : 'Hukay'},
    {name : 'Lucsuhin'},
    {name : 'Luya'},
    {name : 'Paraiso'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Quilitisan'},
    {name : 'Real'},
    {name : 'Sambungan'},
    {name : 'Santa Ana'},
    {name : 'Talibayog'},
    {name : 'Talisay'},
    {name : 'Tanagan'},
  ]

  cuenca = [
    {name : 'Balagbag'},
    {name : 'Bungahan'},
    {name : 'Calumayin'},
    {name : 'Dalipit East'},
    {name : 'Dalipit West'},
    {name : 'Dita'},
    {name : 'Don Juan'},
    {name : 'Emmanuel'},
    {name : 'Ibabao'},
    {name : 'Labac'},
    {name : 'Pinagkaisahan'},
    {name : 'San Felipe'},
    {name : 'San Isidro'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'Barangay 6'},
    {name : 'Barangay 7'},
    {name : 'Barangay 8'},
  ]

  ibaan = [
    {name : 'Bago'},
    {name : 'Balanga'},
    {name : 'Bungahan'},
    {name : 'Calamias'},
    {name : 'Catandala'},
    {name : 'Coliat'},
    {name : 'Dayapan'},
    {name : 'Lapu-lapu'},
    {name : 'Lucsuhin'},
    {name : 'Mabalor'},
    {name : 'Malainin'},
    {name : 'Matala'},
    {name : 'Munting Tubig'},
    {name : 'Palindan'},
    {name : 'Pangao'},
    {name : 'Panghayaan'},
    {name : 'Poblacion'},
    {name : 'Quilo'},
    {name : 'Sabang'},
    {name : 'Salaban I'},
    {name : 'Salaban II'},
    {name : 'San Agustin'},
    {name : 'Sandalan'},
    {name : 'Santo Nino'},
    {name : 'Talaibon'},
    {name : 'Tulay na Patpat'},
  ]

  laurel = [
    {name : 'As-Is'},
    {name : 'Balakilong'},
    {name : 'Berinayan'},
    {name : 'Bugaan East'},
    {name : 'Bugaan West'},
    {name : 'Buso-buso'},
    {name : 'Dayap Itaas'},
    {name : 'Gulod'},
    {name : 'J. Leviste'},
    {name : 'Molinete'},
    {name : 'Niyugan'},
    {name : 'Paliparan'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'San Gabriel'},
    {name : 'San Gregorio'},
    {name : 'Santa Maria'},
    {name : 'Ticub'},
  ]

  lemery = [
    {name : 'Anak-Dagat'},
    {name : 'Arumahan'},
    {name : 'Ayao-iyao'},
    {name : 'Bagong Pook'},
    {name : 'Bagong Sikat'},
    {name : 'Balanga'},
    {name : 'Bukal'},
    {name : 'Cahilan I'},
    {name : 'Cahilan II'},
    {name : 'Dayapan'},
    {name : 'Dita'},
    {name : 'Gulod'},
    {name : 'Lucky'},
    {name : 'Maguihan'},
    {name : 'Mahabang Dahilig'},
    {name : 'Mahayahay'},
    {name : 'Maigsing Dahilig'},
    {name : 'Maligaya'},
    {name : 'Malinis'},
    {name : 'Masalisi'},
    {name : 'Mataas na Bayan'},
    {name : 'Matingain I'},
    {name : 'Matingain II'},
    {name : 'Mayasang'},
    {name : 'Niogan'},
    {name : 'Nonong Casto'},
    {name : 'Palanas'},
    {name : 'Payapa Ibaba'},
    {name : 'Payapa Ilaya'},
    {name : 'District I'},
    {name : 'District II'},
    {name : 'District III'},
    {name : 'District IV'},
    {name : 'Rizal'},
    {name : 'Sambal Ibaba'},
    {name : 'Sambal Ilaya'},
    {name : 'San Isidro Ibaba'},
    {name : 'San Isidro Itaas'},
    {name : 'Sangalang'},
    {name : 'Talaga'},
    {name : 'Tubigan'},
    {name : 'Tubuan'},
    {name : 'Wawa Ibaba'},
    {name : 'Wawa Ilaya'},
    {name : 'Sinisian East'},
    {name : 'Sinisian West'},
  ]

  lian = [
    {name : 'Bagong Pook'},
    {name : 'Balibago'},
    {name : 'Binubusan'},
    {name : 'Bungahan'},
    {name : 'Cumba'},
    {name : 'Humayingan'},
    {name : 'Kapito'},
    {name : 'Lumaniag'},
    {name : 'Luyahan'},
    {name : 'Malaruhatan'},
    {name : 'Matabungkay'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'Prenza'},
    {name : 'Puting kahoy'},
    {name : 'San Diego'},
  ]

  lipa = [
    {name : 'Adya'},
    {name : 'Anilao'},
    {name : 'Anilao-Labac'},
    {name : 'Antipolo del Norte'},
    {name : 'Antipolo del Sur'},
    {name : 'Bagong Pook'},
    {name : 'Balintawak'},
    {name : 'Banaybanay'},
    {name : 'Bolbok'},
    {name : 'Bugtong na Pulo'},
    {name : 'Bulacnin'},
    {name : 'Bulaklakan'},
    {name : 'Calamias'},
    {name : 'Cumba'},
    {name : 'Dagatan'},
    {name : 'Duhatan'},
    {name : 'Halang'},
    {name : 'Inosloban'},
    {name : 'Kayumanggi'},
    {name : 'Latag'},
    {name : 'Lodlod'},
    {name : 'Lumbang'},
    {name : 'Mabini'},
    {name : 'Malagonlong'},
    {name : 'Malitlit'},
    {name : 'Marauoy'},
    {name : 'Mataas na Lipa'},
    {name : 'Munting Pulo'},
    {name : 'Pagolingin Bata'},
    {name : 'Pagolingin East'},
    {name : 'Pagolingin West'},
    {name : 'Pangao'},
    {name : 'Pinagkawitan'},
    {name : 'Pinagtongulan'},
    {name : 'Plaridel'},
    {name : 'Poblacion Barangay 1'},
    {name : 'Poblacion Barangay 2'},
    {name : 'Poblacion Barangay 3'},
    {name : 'Poblacion Barangay 4'},
    {name : 'Poblacion Barangay 5'},
    {name : 'Poblacion Barangay 6'},
    {name : 'Poblacion Barangay 7'},
    {name : 'Poblacion Barangay 8'},
    {name : 'Poblacion Barangay 9'},
    {name : 'Poblacion Barangay 9-A'},
    {name : 'Poblacion Barangay 10'},
    {name : 'Poblacion Barangay 11'},
    {name : 'Poblacion Barangay 12'},
    {name : 'Pusil'},
    {name : 'Quezon'},
    {name : 'Rizal'},
    {name : 'Sabang'},
    {name : 'Sampaguita'},
    {name : 'San Benito'},
    {name : 'San Carlos'},
    {name : 'San Celestino'},
    {name : 'San Francisco'},
    {name : 'San Guillermo'},
    {name : 'San Jose'},
    {name : 'San Lucas'},
    {name : 'San Salvador'},
    {name : 'San Sebastian'},
    {name : 'Santo Nino'},
    {name : 'Santo Toribio'},
    {name : 'Sapac'},
    {name : 'Sico'},
    {name : 'Talisay'},
    {name : 'Tambo'},
    {name : 'Tangob'},
    {name : 'Tanguay'},
    {name : 'Tibig'},
    {name : 'Tipacan'},
  ]

  lobo = [
    {name : 'Apar'},
    {name : 'Balatbaat'},
    {name : 'Balibago'},
    {name : 'Banalo'},
    {name : 'Biga'},
    {name : 'Bignay'},
    {name : 'Calo'},
    {name : 'Calumpit'},
    {name : 'Fabrica'},
    {name : 'Jaybanga'},
    {name : 'Lagadlarin'},
    {name : 'Mabilog na Bundok'},
    {name : 'Malabrigo'},
    {name : 'Malalim na Sanog'},
    {name : 'Malapad na Parang'},
    {name : 'Masaguitsit'},
    {name : 'Nagtalongtong'},
    {name : 'Nagtoctoc'},
    {name : 'Olo-olo'},
    {name : 'Pinaghawanan'},
    {name : 'San Miguel'},
    {name : 'San Nicolas'},
    {name : 'Sawang'},
    {name : 'Soloc'},
    {name : 'Tayuman'},
    {name : 'Poblacion'},
  ]

  mabini = [
    {name : 'Anilao Proper'},
    {name : 'Anilao East'},
    {name : 'Bagalangit'},
    {name : 'Bulacan'},
    {name : 'Calamias'},
    {name : 'Estrella'},
    {name : 'Gasang'},
    {name : 'Laurel'},
    {name : 'Ligaya'},
    {name : 'Mainaga'},
    {name : 'Mainit'},
    {name : 'Majuben'},
    {name : 'Malimatoc I'},
    {name : 'Malimatoc II'},
    {name : 'Nag-Iba'},
    {name : 'Pilahan'},
    {name : 'Poblacion'},
    {name : 'Pulang Lupa'},
    {name : 'Pulong Anahao'},
    {name : 'Pulong Balibaguhan'},
    {name : 'Pulong Niogan'},
    {name : 'Saguing'},
    {name : 'Sampaguita'},
    {name : 'San Francisco'},
    {name : 'San Jose'},
    {name : 'San Juan'},
    {name : 'San Teodoro'},
    {name : 'Santa Ana'},
    {name : 'Santa Mesa'},
    {name : 'Santo Nino'},
    {name : 'Santo Tomas'},
    {name : 'Solo'},
    {name : 'Talaga Proper'},
    {name : 'Talaga East'},
  ]

  malvar = [
    {name : 'Bagong Pook'},
    {name : 'Bilucao'},
    {name : 'Bulihan'},
    {name : 'San Gregorio'},
    {name : 'Luta del Norte'},
    {name : 'Luta del Sur'},
    {name : 'Poblacion'},
    {name : 'San Andres'},
    {name : 'San Fernando'},
    {name : 'San Isidro East'},
    {name : 'San Juan'},
    {name : 'San Pedro II'},
    {name : 'San Pedro I'},
    {name : 'San Pioquinto'},
    {name : 'Santiago'},
  ]

  mataasnakahoy = [
    {name : 'District I'},
    {name : 'District II'},
    {name : 'District III'},
    {name : 'District IV'},
    {name : 'Bayorbor'},
    {name : 'Bubuyan'},
    {name : 'Calingatan'},
    {name : 'Kinalaglagan'},
    {name : 'Loob'},
    {name : 'Lumang Lupa'},
    {name : 'Manggahan'},
    {name : 'Nangkaan'},
    {name : 'San Sebastian'},
    {name : 'Santol'},
    {name : 'Upa'},
    {name : 'Barangay II-A'},
  ]

  nasugbu = [
    {name : 'Aga'},
    {name : 'Balaytigui'},
    {name : 'Banilad'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'Barangay 6'},
    {name : 'Barangay 7'},
    {name : 'Barangay 8'},
    {name : 'Barangay 9'},
    {name : 'Barangay 10'},
    {name : 'Barangay 11'},
    {name : 'Barangay 12'},
    {name : 'Bilaran'},
    {name : 'Bucana'},
    {name : 'Bulihan'},
    {name : 'Bunducan'},
    {name : 'Butucan'},
    {name : 'Calayo'},
    {name : 'Catandaan'},
    {name : 'Kaylaway'},
    {name : 'Kayrilaw'},
    {name : 'Cogunan'},
    {name : 'Dayap'},
    {name : 'Latag'},
    {name : 'Looc'},
    {name : 'Lumbangan'},
    {name : 'Malapad na Bato'},
    {name : 'Mataas na Pulo'},
    {name : 'Maugat'},
    {name : 'Munting Indan'},
    {name : 'Natipuan'},
    {name : 'Pantalan'},
    {name : 'Papaya'},
    {name : 'Putat'},
    {name : 'Reparo'},
    {name : 'Talangan'},
    {name : 'Tumalim'},
    {name : 'Utod'},
    {name : 'Wawa'},
  ]

  padregarcia = [
    {name : 'Banaba'},
    {name : 'Banaybanay'},
    {name : 'Bawi'},
    {name : 'Bukal'},
    {name : 'Castillo'},
    {name : 'Cawongan'},
    {name : 'Manggas'},
    {name : 'Maugat East'},
    {name : 'Maugat West'},
    {name : 'Pansol'},
    {name : 'Payapa'},
    {name : 'Poblacion'},
    {name : 'Quilo-quilo North'},
    {name : 'Quilo-quilo South'},
    {name : 'San Felipe'},
    {name : 'San Miguel'},
    {name : 'Tamak'},
    {name : 'Tangob'},
  ]

  rosario = [
    {name : 'Alupay'},
    {name : 'Antipolo'},
    {name : 'Bagong Pook'},
    {name : 'Balibago'},
    {name : 'Barangay A'},
    {name : 'Barangay B'},
    {name : 'Barangay C'},
    {name : 'Barangay D'},
    {name : 'Barangay E'},
    {name : 'Bayawang'},
    {name : 'Baybayin'},
    {name : 'Bulihan'},
    {name : 'Cahigam'},
    {name : 'Calantas'},
    {name : 'Colongan'},
    {name : 'Itlugan'},
    {name : 'Leviste'},
    {name : 'Lumbangan'},
    {name : 'Maalas-As'},
    {name : 'Mabato'},
    {name : 'Mabunga'},
    {name : 'Macalamcam A'},
    {name : 'Macalamcam B'},
    {name : 'Malaya'},
    {name : 'Maligaya'},
    {name : 'Marilag'},
    {name : 'Masya'},
    {name : 'Matamis'},
    {name : 'Mavalor'},
    {name : 'Mayuro'},
    {name : 'Namuco'},
    {name : 'Namunga'},
    {name : 'Natu'},
    {name : 'Nasi'},
    {name : 'Palakpak'},
    {name : 'Pinagsibaan'},
    {name : 'Putingkahoy'},
    {name : 'Quilib'},
    {name : 'Salao'},
    {name : 'San Carlos'},
    {name : 'San Ignacio'},
    {name : 'San Isidro'},
    {name : 'San Jose'},
    {name : 'San Roque'},
    {name : 'Santa Cruz'},
    {name : 'Timbugan'},
    {name : 'Tiquiwan'},
    {name : 'Tulos'},
  ]
      
  sanjose = [
    {name : 'Aguila'},
    {name : 'Anus'},
    {name : 'Aya'},
    {name : 'Bagong Pook'},
    {name : 'Balagtasin'},
    {name : 'Balagtasin I'},
    {name : 'Banaybanay I'},
    {name : 'Banaybanay II'},
    {name : 'Bigain I'},
    {name : 'Bigain II'},
    {name : 'Bigain South'},
    {name : 'Calansayan'},
    {name : 'Dagatan'},
    {name : 'Don Luis'},
    {name : 'Galamay Amo'},
    {name : 'Lalayat'},
    {name : 'Lapolapo I'},
    {name : 'Lapolapo II'},
    {name : 'Lepute'},
    {name : 'Lumil'},
    {name : 'Natunuan'},
    {name : 'Palanca'},
    {name : 'Pinagtung-Ulan'},
    {name : 'Poblacion Barangay I'},
    {name : 'Poblacion Barangay II'},
    {name : 'Poblacion Barangay III'},
    {name : 'Poblacion Barangay IV'},
    {name : 'Sabang'},
    {name : 'Salaban'},
    {name : 'Santo Cristo'},
    {name : 'Mojon-Tampoy'},
    {name : 'Taysan'},
    {name : 'Tugtug'},
  ]

  sanjuan = [
    {name : 'Abung'},
    {name : 'Balagbag'},
    {name : 'Barualte'},
    {name : 'Bataan'},
    {name : 'Buhay na Sapa'},
    {name : 'Bulsa'},
    {name : 'Calicanto'},
    {name : 'Calitcalit'},
    {name : 'Calubcub I'},
    {name : 'Calubcub II'},
    {name : 'Catmon'},
    {name : 'Coloconto'},
    {name : 'Escribano'},
    {name : 'Hugom'},
    {name : 'Imelda'},
    {name : 'Janaojanao'},
    {name : 'Laiya-Aplaya'},
    {name : 'Laiya-Ibabao'},
    {name : 'Libato'},
    {name : 'Lipahan'},
    {name : 'Mabalanoy'},
    {name : 'Maraykit'},
    {name : 'Muzon'},
    {name : 'Nagsaulay'},
    {name : 'Palahanan I'},
    {name : 'Palahanan II'},
    {name : 'Palingowak'},
    {name : 'Pinagbayanan'},
    {name : 'Poblacion'},
    {name : 'Poctol'},
    {name : 'Pulangbato'},
    {name : 'Putingbuhangin'},
    {name : 'Quipot'},
    {name : 'Sampiro'},
    {name : 'Sapangan'},
    {name : 'Sico I'},
    {name : 'Sico II'},
    {name : 'Subukin'},
    {name : 'Talahiban I'},
    {name : 'Talahiban II'},
    {name : 'Ticalan'},
    {name : 'Tipaz'},
  ]

  sanluis = [
    {name : 'Abiacao'},
    {name : 'Bagong Tubig'},
    {name : 'Balagtasin'},
    {name : 'Balite'},
    {name : 'Banoyo'},
    {name : 'Boboy'},
    {name : 'Bonliw'},
    {name : 'Calumpang West'},
    {name : 'Calumpang East'},
    {name : 'Dulangan'},
    {name : 'Durungao'},
    {name : 'Locloc'},
    {name : 'Luya'},
    {name : 'Mahabang Parang'},
    {name : 'Manggahan'},
    {name : 'Muzon'},
    {name : 'Poblacion'},
    {name : 'San Antonio'},
    {name : 'San Isidro'},
    {name : 'San Jose'},
    {name : 'San Martin'},
    {name : 'Santa Monica'},
    {name : 'Taliba'},
    {name : 'Talon'},
    {name : 'Tejero'},
    {name : 'Tungal'},
  ]

  sannicolas = [
    {name : 'Abelo'},
    {name : 'Balete'},
    {name : 'Baluk-baluk'},
    {name : 'Bancoro'},
    {name : 'Bangin'},
    {name : 'Calangay'},
    {name : 'Hipit'},
    {name : 'Maabud North'},
    {name : 'Maabud South'},
    {name : 'Munlawin'},
    {name : 'Pansipit'},
    {name : 'Poblacion'},
    {name : 'Santo Nino'},
    {name : 'Sinturisan'},
    {name : 'Tagudtod'},
    {name : 'Talang'},
    {name : 'Alas-as'},
    {name : 'Pulang Bato'},
  ]

  sanpascual = [
    {name : 'Alalum'},
    {name : 'Antipolo'},
    {name : 'Balimbing'},
    {name : 'Banaba'},
    {name : 'Bayanan'},
    {name : 'Danglayan'},
    {name : 'Del Pilar'},
    {name : 'Gelerang Kawayan'},
    {name : 'Ilat North'},
    {name : 'Ilat South'},
    {name : 'Kaingin'},
    {name : 'Laurel'},
    {name : 'Malaking Pook'},
    {name : 'Mataas na Lupa'},
    {name : 'Natunuan North'},
    {name : 'Natunuan South'},
    {name : 'Padre Castillo'},
    {name : 'Palsahingin'},
    {name : 'Pila'},
    {name : 'Poblacion'},
    {name : 'Pook ni Banal'},
    {name : 'Pook ni Kapitan'},
    {name : 'Resplandor'},
    {name : 'Sambat'},
    {name : 'San Antonio'},
    {name : 'San Mariano'},
    {name : 'San Mateo'},
    {name : 'Santa Elena'},
    {name : 'Santo Nino'},
  ]

  santateresita = [
    {name : 'Antipolo'},
    {name : 'Bihis'},
    {name : 'Burol'},
    {name : 'Calayaan'},
    {name : 'Calumala'},
    {name : 'Cuta East'},
    {name : 'Cutang Cawayan'},
    {name : 'Irukan'},
    {name : 'Pacifico'},
    {name : 'Poblacion I'},
    {name : 'Poblacion II'},
    {name : 'Poblacion III'},
    {name : 'Saimsim'},
    {name : 'Sampa'},
    {name : 'Sinipian'},
    {name : 'Tambo Ibaba'},
    {name : 'Tambo Ilaya'},
  ]

  santotomas = [
    {name : 'Barangay I'},
    {name : 'Barangay II'},
    {name : 'Barangay III'},
    {name : 'Barangay IV'},
    {name : 'San Agustin'},
    {name : 'San Antonio'},
    {name : 'San Bartolome'},
    {name : 'San Felix'},
    {name : 'San Fernando'},
    {name : 'San Francisco'},
    {name : 'San Isidro Norte'},
    {name : 'San Isidro Sur'},
    {name : 'San Joaquin'},
    {name : 'San Jose'},
    {name : 'San Juan'},
    {name : 'San Luis'},
    {name : 'San Miguel'},
    {name : 'San Pablo'},
    {name : 'San Pedro'},
    {name : 'San Rafael'},
    {name : 'San Roque'},
    {name : 'San Vicente'},
    {name : 'Santa Ana'},
    {name : 'Santa Anastacia'},
    {name : 'Santa Clara'},
    {name : 'Santa Cruz'},
    {name : 'Santa Elena'},
    {name : 'Santa Maria'},
    {name : 'Santa Teresita'},
    {name : 'Santiago'},
  ]

  taal = [
    {name : 'Apacay'},
    {name : 'Balisong'},
    {name : 'Bihis'},
    {name : 'Bolbok'},
    {name : 'Buli'},
    {name : 'Butong'},
    {name : 'Carasuche'},
    {name : 'Cawit'},
    {name : 'Caysasay'},
    {name : 'Cubamba'},
    {name : 'Cultihan'},
    {name : 'Gahol'},
    {name : 'Halang'},
    {name : 'Iba'},
    {name : 'Ilog'},
    {name : 'Imamawo'},
    {name : 'Ipil'},
    {name : 'Laguile'},
    {name : 'Latag'},
    {name : 'Luntal'},
    {name : 'Mahabang Lodlod'},
    {name : 'Niogan'},
    {name : 'Pansol'},
    {name : 'Poblacion 1'},
    {name : 'Poblacion 2'},
    {name : 'Poblacion 3'},
    {name : 'Poblacion 4'},
    {name : 'Poblacion 5'},
    {name : 'Poblacion 6'},
    {name : 'Poblacion 7'},
    {name : 'Poblacion 8'},
    {name : 'Poblacion 9'},
    {name : 'Poblacion 10'},
    {name : 'Poblacion 11'},
    {name : 'Poblacion 12'},
    {name : 'Poblacion 13'},
    {name : 'Poblacion 14'},
    {name : 'Pook'},
    {name : 'Seiran'},
    {name : 'Tatlong Maria'},
    {name : 'Tierra Alta'},
    {name : 'Tulo'},
  ]

  talisay = [
    {name : 'Aya'},
    {name : 'Balas'},
    {name : 'Banga'},
    {name : 'Buco'},
    {name : 'Caloocan'},
    {name : 'Leynes'},
    {name : 'Miranda'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'Barangay 6'},
    {name : 'Barangay 7'},
    {name : 'Barangay 8'},
    {name : 'Quiling'},
    {name : 'Sampaloc'},
    {name : 'San Guillermo'},
    {name : 'Santa Maria'},
    {name : 'Tranca'},
    {name : 'Tumaway'},
  ]

  tanauan = [
    {name : 'Altura Bata'},
    {name : 'Altura Matanda'},
    {name : 'Altura South'},
    {name : 'Ambulong'},
    {name : 'Banadero'},
    {name : 'Bagbag'},
    {name : 'Bagumbayan'},
    {name : 'Balele'},
    {name : 'Banjo East'},
    {name : 'Banjo Laurel'},
    {name : 'Bilogbilog'},
    {name : 'Boot'},
    {name : 'Cale'},
    {name : 'Darasa'},
    {name : 'Gonzales'},
    {name : 'Hidalgo'},
    {name : 'Janopol Occidental'},
    {name : 'Janopol Oriental'},
    {name : 'Laurel'},
    {name : 'Luyos'},
    {name : 'Mabini'},
    {name : 'Malaking Pulo'},
    {name : 'Maria Paz'},
    {name : 'Maugat'},
    {name : 'Montana'},
    {name : 'Natatas'},
    {name : 'Pagaspas'},
    {name : 'Pantay Matanda'},
    {name : 'Pantay Bata'},
    {name : 'Barangay 1'},
    {name : 'Barangay 2'},
    {name : 'Barangay 3'},
    {name : 'Barangay 4'},
    {name : 'Barangay 5'},
    {name : 'Barangay 6'},
    {name : 'Barangay 7'},
    {name : 'Sala'},
    {name : 'Sombat'},
    {name : 'San Jose'},
    {name : 'Santol'},
    {name : 'Santor'},
    {name : 'Supoc'},
    {name : 'Suplang'},
    {name : 'Talaga'},
    {name : 'Tinurik'},
    {name : 'Trapiche'},
    {name : 'Ulango'},
    {name : 'Wawa'},
  ]

  taysan = [
    {name : 'Bacao'},
    {name : 'Bilogo'},
    {name : 'Bukal'},
    {name : 'Dagatan'},
    {name : 'Guinhawa'},
    {name : 'Laurel'},
    {name : 'Mabayabas'},
    {name : 'Mahanadiong'},
    {name : 'Mapulo'},
    {name : 'Mataas na Lupa'},
    {name : 'Pag-Asa'},
    {name : 'Panghayaan'},
    {name : 'Pina'},
    {name : 'Pinagbayanan'},
    {name : 'Poblacion East'},
    {name : 'Poblacion West'},
    {name : 'San Isidro'},
    {name : 'San Marcelino'},
    {name : 'Santo Nino'},
    {name : 'Tilambo'},
  ]

  tingloy = [
    {name : 'Corona'},
    {name : 'Gamao'},
    {name : 'Makawayan'},
    {name : 'Marikaban'},
    {name : 'Papaya'},
    {name : 'Pisa'},
    {name : 'Barangay 13'},
    {name : 'Barangay 14'},
    {name : 'Barangay 15'},
    {name : 'San Isidro'},
    {name : 'San Jose'},
    {name : 'San Juan'},
    {name : 'San Pedro'},
    {name : 'Santo Tomas'},
    {name : 'Talahib'},
  ]

  tuy = [
    {name : 'Acle'},
    {name : 'Bayudbud'},
    {name : 'Bolboc'},
    {name : 'Burgos'},
    {name : 'Dalima'},
    {name : 'Dao'},
    {name : 'Guinhawa'},
    {name : 'Lumbangan'},
    {name : 'Luna'},
    {name : 'Luntal'},
    {name : 'Magahis'},
    {name : 'Malibu'},
    {name : 'Mataywanac'},
    {name : 'Palincaro'},
    {name : 'Rizal'},
    {name : 'Rillo'},
    {name : 'Putol'},
    {name : 'Sabang'},
    {name : 'San Jose'},
    {name : 'Talon'},
    {name : 'Toong'},
    {name : 'Tuyon-tuyon'},
    
  ]
  
}
