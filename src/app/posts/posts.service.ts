import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{posts: any}>(
        BACKEND_URL
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map(post => {     // mozda treba samo postData.map !!!!!!!!!!!!!!!!!!
              return {
                id: post._id,
                email: post.email,
                password: post.password,
                pol: post.pol,
                visina: post.visina,
                tezina: post.tezina,
              };
            })
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }



}
