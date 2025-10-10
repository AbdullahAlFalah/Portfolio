import MovieWithComments from '../../components/form/Moviesandcomments';

export default function FlaskAPI() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh', // full viewport height
        }}>
            <MovieWithComments />
        </div>
    );
}
