import {
  faEllipsisH,
  faEdit,
  faTrashAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  ButtonGroup,
  Dropdown,
  Button,
} from '@themesberg/react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'routes';
import { axiosLocal } from '../../api/local-api';
import { RuleService } from 'services/rules.service';

const RoleRow = (props) => {
  const {
    id,
    name,
    conditionDevice,
    conditionOperator,
    conditionValue,
    targetDevice,
    targetValue,
    onDelete,
  } = props;

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        <span className="fw-normal">
          {conditionDevice.name +
            ' ' +
            conditionOperator +
            ' ' +
            conditionValue}
        </span>
      </Td>
      <Td>
        <span className="fw-normal">
          {targetDevice.name + ' set to ' + targetValue}
        </span>
      </Td>
      <Td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            as={Button}
            split
            variant="link"
            className="text-dark m-0 p-0"
          >
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={Routes.Rules.edit.replace(':id', id)}>
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => onDelete(id)}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Td>
    </Tr>
  );
};

export function Rules() {
  let [rules, setRules] = React.useState([]);

  function handleDelete(id) {
    axiosLocal.delete(`/rules/${id}`).then((res) => {
      setRules((rules) => rules.filter((item) => item.id !== id));
    });
  }

  React.useEffect(() => {
    RuleService.getAll().then((res) => {
      setRules(res.data);
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button variant="primary" size="sm" as={Link} to={Routes.Rules.create}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New rule
        </Button>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Card.Title>
            <b>Rules</b>
          </Card.Title>
          <Table className="user-table align-items-center">
            <Thead>
              <Tr>
                <Th>Rule name</Th>
                <Th>If</Th>
                <Th>Then</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rules &&
                rules.map((t) => (
                  <RoleRow key={`${t.id}`} {...t} onDelete={handleDelete} />
                ))}
            </Tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
