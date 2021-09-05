import {Post} from './post';
import styles from './styles/styles.css';

const post =  new Post('webpack Post Title');

console.log('post: ', post.title.toString());