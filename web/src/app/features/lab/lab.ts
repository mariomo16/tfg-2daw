import { Component } from '@angular/core';
import { Button } from "./button/button";

@Component({
  selector: 'app-lab',
  imports: [Button],
  templateUrl: './lab.html',
  styleUrl: './lab.css',
})
export class Lab {}
