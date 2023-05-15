import Notiflix from 'notiflix';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { getContacts, selectFilterField } from 'redux/selectors';
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // беремо значення поля find contacts
  const filterValue = useSelector(selectFilterField);

  // фільтруємо масив якщо було змінено значення поля find contacts
  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

  return (
    <>
      {contacts.length === 0 ? (
        <div>You not have contcts</div>
      ) : (
        <ul>
          {filteredContacts().map(({ name, number, id }) => (
            <li key={id}>
              <span className={css.name}> {name}:</span>
              <span className={css.number}>{number}</span>
              <button
                type="button"
                id={id}
                onClick={() => {
                  Notiflix.Notify.success(`You delete contact`);
                  dispatch(deleteContact(id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
  // const { data: contacts, isLoading } = useGetContactsQuery();
  // console.log('contacts', contacts);
  // const [func] = useDeleteContactsMutation();
  // // беремо значення поля find contacts
  // const filterValue = useSelector(selectFilterField);
  // // фільтруємо масив якщо було змінено значення поля find contacts
  // const filteredContacts = () =>
  //   contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filterValue)
  //   );
  // return (
  //   <>
  //     {/* якщо виконується дія, показуємо Loading над нашим списком контактів */}
  //     {isLoading ? <div>Loading...</div> : ''}
  //     <ul>
  //       {!isLoading &&
  //         filteredContacts().map(({ name, phone, id }) => (
  //           <li key={id}>
  //             <span className={css.name}> {name}:</span>
  //             <span className={css.number}>{phone}</span>
  //             <button
  //               type="button"
  //               id={id}
  //               onClick={() => {
  //                 Notiflix.Notify.success(`You delete contact`);
  //                 func(id);
  //               }}
  //             >
  //               Delete
  //             </button>
  //           </li>
  //         ))}
  //     </ul>
  //   </>
  // );
}
