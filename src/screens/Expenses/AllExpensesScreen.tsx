import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Card} from 'react-native-paper';

import {api} from '../../api';
import {TOP_EXPENDING_CATEGORIES} from '../../api/mockData';
import Loading from '../../components/UI/Loading';
import ListItem from '../../components/expenses/ListItem';
import Colors from '../../constants/Colors';

const AllExpensesScreen = () => {
  const {data, isLoading} = api.endpoints.getApi.useQuery();
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header style={{backgroundColor: Colors.primary}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color={Colors.white}
        />
        <Appbar.Content color={Colors.white} title="Expenses" />
      </Appbar.Header>

      {isLoading && <Loading />}

      <ScrollView>
        <Card style={{marginTop: 10}}>
          <Card.Content>
            {data && (
              <View>
                <Card>
                  <Card.Title
                    title="All Spending Categories"
                    titleStyle={styles.cardTitle}
                  />
                  <Card.Content>
                    {TOP_EXPENDING_CATEGORIES.map((record, index) => (
                      <ListItem key={index} record={record} />
                    ))}
                  </Card.Content>
                </Card>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 14,
  },
});

export default AllExpensesScreen;
