import React,{ useState,useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles';
import img from './images/img2.PNG';

const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const classes = useStyles();
  
    useEffect(() => {
      alanBtn({
        key: '32bb57d4db56eec8307c9733fdb8e7782e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'instructions') {
            setIsOpen(true);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }


          }
        },
      });
    }, []);
  


// const alankey='32bb57d4db56eec8307c9733fdb8e7782e956eca572e1d8b807a3e2338fdd0dc/stage';


    return (
        <div>
          <div className={classes.logoContainer}>
            {newsArticles.length ? (
              <div className={classes.infoContainer}>
                <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
              </div>
            ) : null}
            <img src={img} className={classes.alanLogo} alt="logo" />
          </div>
          <NewsCards articles={newsArticles} activeArticle={activeArticle} />
          
          {!newsArticles.length ? (
            <div className={classes.footer}>
              <Typography variant="body1" component="h2">
                Created by Khushi.
              
              </Typography>
              
            </div>
          ) : null}
        </div>
      );
    };
export default App;

