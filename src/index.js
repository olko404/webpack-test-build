import {Post} from './post';
import * as $ from 'jquery';
import Logo from './assets/img/logo/logo.svg'

const post = new Post('webpack Post Title', Logo);

$('pre').html(post.toString())