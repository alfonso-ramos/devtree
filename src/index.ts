import colors from 'colors';
import server from './server';

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(colors.bgGreen.black.bold(`Server is running on http://localhost:${PORT}`));
});