import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { BrowserQRCodeReader } from '@zxing/browser';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { HttpClientModule } from '@angular/common/http';


//npm install @zxing/browser

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {


  nss: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  // Method to call the backend API and handle responses
 private checkNSSInBackend(nss: string) {
  this.http.get<{ patients?: any[], error?: string }>(`http://127.0.0.1:8000/recherche/ssn/?query=${nss}`)
    .subscribe({
      next: (response) => {
        if (response.error) {
          if (response.error === 'No patients found') {
            this.errorMessage = 'Aucun patient trouvé pour ce NSS.';
          } else if (response.error === 'Query too short, at least 3 characters required') {
            this.errorMessage = 'Le NSS doit contenir au moins 3 caractères.';
          } else {
            this.errorMessage = 'Erreur inconnue.';
          }
          this.autoDismissError();
        } else if (response.patients && response.patients.length > 0) {
          console.log(response.patients) ;
          //this.router.navigate(['/DPI', nss]);
        } else {
          this.errorMessage = 'Aucun patient trouvé pour ce NSS.';
          this.autoDismissError();
        }
      },
      error: (err) => {
        if (err.status === 404) {
          console.log('404 Error:', err.error);  // Log the error details
          this.errorMessage = 'Aucun patient trouvé pour ce NSS.';
        } else if (err.status === 400 && err.error === 'Query too short, at least 3 characters required') {
          this.errorMessage = 'Le NSS doit contenir au moins 3 caractères.';
        } else {
          this.errorMessage = 'Erreur inconnue.';
        }
        console.error('Error fetching NSS data:', err);
        this.autoDismissError();
      }
    });
 }

 searchNSS() {
  this.errorMessage = '';
  
  if (!this.isValidNSS(this.nss)) {
    this.errorMessage = 'NSS format incorrect.';
    this.autoDismissError();
  } else {
    // Re-use the new method for the API call
    this.checkNSSInBackend(this.nss);
  }
 }



  
  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null ;
    }, 1000);  // The alert will disappear after 30 seconds
  }


  // NSS Validation Logic
  isValidNSS(nss: string): boolean {
    const regex = /^[0-9]{4}$/; // Example format: 15-digit number
    return regex.test(nss);
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
          console.log('Decoded QR Code:', decodedText);
          this.checkNSSInBackend(decodedText);
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




/*


export class Recherche {
  nss: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}



  autoDismissError() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 1000);  // The alert will disappear after 1 second
  }

  // NSS Validation Logic
  isValidNSS(nss: string): boolean {
    const regex = /^[0-9]{15}$/; // Example format: 15-digit number
    return regex.test(nss);
  }

     // Validate and Search NSS
     searchNSS() {
      this.errorMessage = '';
  
      if (!this.isValidNSS(this.nss)) {
        this.errorMessage = 'NSS format incorrect.';
        this.autoDismissError();
      } else {
        // Call the backend API to check if NSS exists
        this.http.get(`http://127.0.0.1:8000/recherche/ssn/?query=${this.nss}`)
          .subscribe({
            next: (response: any) => {
              // Assuming the response will tell us whether the NSS exists or not
              if (response.exists) {  // Modify this based on your API response structure
                console.log(this.nss) ;
                //this.router.navigate(['/DPI', this.nss]);  // Navigate to the DPI
              } else {
                this.errorMessage = 'NSS n\'existe pas.';
                this.autoDismissError();
              }
            },
            error: (err) => {
              console.error('Error fetching NSS data:', err);
              this.errorMessage = 'Erreur lors de la recherche du NSS.';
              this.autoDismissError();
            }
          });
      }
    }



  qrCodeReader = new BrowserQRCodeReader();

  onQrScan(): void {
    this.errorMessage = '';

    // Create file input dynamically to select an image
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Accept only image files
    fileInput.click();

    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0]; // Get selected file
      if (file) {
        try {
          const decodedText = await this.decodeQrCodeFromFile(file);
          console.log('Decoded QR Code:', decodedText);

          // Use the decoded NSS from QR code to check if it exists
          this.http.get(`http://127.0.0.1:8000/recherche/ssn/?query=${decodedText}`)
            .subscribe({
              next: (response: any) => {
                if (response.exists) {
                  console.log('QR Code NSS exists');
                  this.router.navigate(['/DPI', decodedText]);  // Navigate to the DPI
                } else {
                  this.errorMessage = 'QR Code n\'existe pas.';
                  this.autoDismissError();
                }
              },
              error: (err) => {
                console.error('Error fetching NSS from QR code:', err);
                this.errorMessage = 'Erreur lors de la lecture du QR Code.';
                this.autoDismissError();
              }
            });
        } catch (error) {
          console.error('Failed to decode QR Code:', error);
          this.errorMessage = 'Impossible de décoder le QR Code. Veuillez réessayer.';
          this.autoDismissError();
        }
      }
    };
  }

  private decodeQrCodeFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          this.qrCodeReader.decodeFromImageElement(image)
            .then((result) => {
              resolve(result.getText ? result.getText() : (result as any).text);
            })
            .catch(reject);
        };
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
*/