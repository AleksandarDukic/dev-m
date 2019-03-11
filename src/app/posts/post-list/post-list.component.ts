import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  isLoading = false;
  posts: Post[] = [];

  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[]}) => {
        this.isLoading = false;
        this.posts = postData.posts;
      });
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
