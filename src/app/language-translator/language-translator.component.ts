import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-language-translator',
  templateUrl: './language-translator.component.html',
  styleUrls: ['./language-translator.component.css']
})
export class LanguageTranslatorComponent {
  sourceText: string = '';
  translatedText: string = '';
  targetLanguage: string = 'en'; // Default target language

  constructor(private http: HttpClient) {}

  translate() {
    const sourceLanguage = 'en'; // Assuming source language is English

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${this.targetLanguage}&dt=t&q=${encodeURIComponent(this.sourceText)}`;

    this.http.get<any>(url).subscribe(
      response => {
        if (response && response[0] && response[0][0] && response[0][0][0]) {
          this.translatedText = response[0][0][0];
        } else {
          this.translatedText = 'Translation failed';
        }
      },
      error => {
        console.error('Error:', error);
        this.translatedText = 'Translation failed';
      }
    );
  }
}