import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, useParams} from 'react-router-dom';
import FilmDetails from '../../components/film-details/film-details';
import FilmNav from '../../components/film-nav/film-nav';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmReviews from '../../components/film-reviews/film-reviews';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import {getFilmById} from '../../mocks/films';
import {reviews} from '../../mocks/reviews';
import {Films} from '../../types/film';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type FilmsListProps = {
  smallFilmCards: Films;
}

function FilmDetailScreen({smallFilmCards}: FilmsListProps): JSX.Element {

  const [currentView, setCurrentView] = useState('overview');

  const params = useParams();
  const film = getFilmById(Number(params.id));

  if (!film) {
    return <NotFoundScreen />;
  }

  /** TODO: убрать из компонента (подумать над реализацией) */
  function renderSwitchView() {
    if (!film) {
      return false;
    }

    switch (currentView) {
      case 'overview':
        return <FilmOverview film={film}/>;
      case 'details':
        return <FilmDetails film={film}/>;
      case 'reviews':
        return <FilmReviews reviews={reviews}/>;
      default:
        return <FilmOverview film={film}/>;
    }
  }

  return (
    <>
      <section className="film-card film-card--full">

        <Helmet>
          <title>{film.title}</title>
        </Helmet>

        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.bgImage ?? film.img} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.year}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${film.id}`} className="btn btn--play film-card__button" >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={`/films/${film.id}/review`} className="btn film-card__button" >Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.img} alt={film.title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmNav currentView={currentView} handleTabClick={(view: string) => setCurrentView(view)}/>

              {renderSwitchView()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <FilmsList smallFilmCards={smallFilmCards} />
          </div>
        </section>

        <footer className="page-footer">
          <Logo light />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmDetailScreen;
