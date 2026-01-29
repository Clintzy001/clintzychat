import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const StatusRow = ({ statuses }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {statuses.map((item) => (
          <View key={item.id} style={styles.statusItem}>
            <View style={[styles.ring, item.hasNew ? styles.activeRing : styles.viewedRing]}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
            </View>
            <Text style={styles.username}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 15, backgroundColor: '#000' },
  statusItem: { alignItems: 'center', marginRight: 15, marginLeft: 10 },
  ring: { padding: 3, borderRadius: 35, borderWeight: 2 },
  activeRing: { borderColor: '#F57C00', borderWidth: 2.5 }, // Clintzy Orange
  viewedRing: { borderColor: '#333', borderWidth: 1 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  username: { color: '#fff', fontSize: 12, marginTop: 5, fontStyle: 'italic' }
});

export default StatusRow;
