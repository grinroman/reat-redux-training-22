import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} from '../../actions';
import classNames from 'classnames';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const { filtersLoadingStatus, activeFilter, filters } = useSelector(
        (state) => state.filters
    );
    const { request } = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then((data) => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
        }

        return arr.map(({ name, className, label }) => {
            const btnClass = classNames('btn', className, {
                active: name === activeFilter,
            });

            return (
                <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(name))}
                >
                    {label}
                </button>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
