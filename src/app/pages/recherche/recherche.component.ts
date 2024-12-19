import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // For *ngIf
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { BrowserQRCodeReader } from '@zxing/browser';


//npm install @zxing/browser

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [[CommonModule,FormsModule]],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {


  nss: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  // Validate and Search NSS
  searchNSS() {
    this.errorMessage = '';

    if (!this.isValidNSS(this.nss)) {
      this.errorMessage = 'NSS format incorrect.';
      this.autoDismissError();

    } else {

      // Simulate an API call to check if NSS exists
       const nssExists = this.checkNSSInDatabase(this.nss);

      if (nssExists) {
        // nzid DPI/:nss f routers 
        this.router.navigate(['/DPI', this.nss]); // Navigate to the DPI
      } else {
        this.errorMessage = 'NSS n\'existe pas.';
        this.autoDismissError();
      }
    }
  }

  
  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null ;
    }, 1000);  // The alert will disappear after 30 seconds
  }


  // NSS Validation Logic
  isValidNSS(nss: string): boolean {
    const regex = /^[0-9]{15}$/; // Example format: 15-digit number
    return regex.test(nss);
  }

  // Simulate Database Check
  checkNSSInDatabase(nss: string): boolean {
    const mockDatabase = ['123456789012345', '987654321098765'];
    return mockDatabase.includes(nss);
  }

  qrCodeReader = new BrowserQRCodeReader();

  onQrScan(): void {

    this.errorMessage = '';

    // Créer dynamiquement un élément d'entrée pour sélectionner un fichier
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Permet de choisir uniquement des fichiers image
    fileInput.click();

    // Gestion de l'événement après sélection d'un fichier
    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0]; // Récupérer le fichier sélectionné
      if (file) {
        try {
          const decodedText = await this.decodeQrCodeFromFile(file);
          console.log('QR Code décodé :', decodedText);

          // Simulate an API call to check if NSS exists
          const QrExists = this.checkNSSInDatabase(decodedText);

          if (QrExists) {
            console.log('ouiiiiiii');  // zidi DPI/:nss f routers 
            this.router.navigate(['/DPI', this.nss]); // Navigate to the DPI
          } else {
            this.errorMessage = 'Qr n\'existe pas.';
            this.autoDismissError();
          }

        } catch (error) {
          console.error('Échec du décodage du QR Code :', error);
          this.errorMessage = 'Impossible de décoder le QR Code. Veuillez réessayer.';
          this.autoDismissError();
        }
      }
    };
  }

  private decodeQrCodeFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Charger le fichier comme DataURL
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;
        

        image.onload = () => {
          console.log('Image loaded successfully'); // Debug
          this.qrCodeReader
            .decodeFromImageElement(image)
            .then((result) => {
              const decodedText = result.getText ? result.getText() : (result as any).text;
              resolve(decodedText);
            })
            .catch((err) => {
              console.error('Decoding failed:', err);
              reject(err);
            });
        };
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }


}
