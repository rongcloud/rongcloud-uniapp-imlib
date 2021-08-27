package io.dcloud.uniplugin;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


class Utils {
    private static String getPathFromUri(Context context, Uri uri, String fileName) {
        try {
            InputStream inputStream = context.getContentResolver().openInputStream(uri);
            File file = createTemporalFile(context, inputStream, fileName);
            if (file != null) {
                return file.getPath();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private static File createTemporalFile(Context context, InputStream inputStream, String fileName) throws IOException {
        if (inputStream != null) {
            File target = new File(context.getCacheDir(), fileName);
            OutputStream outputStream = new FileOutputStream(target);
            try {
                byte[] buffer = new byte[1024];
                int read;
                while ((read = inputStream.read(buffer)) > 0) {
                    outputStream.write(buffer, 0, read);
                }
            } finally {
                outputStream.close();
                inputStream.close();
            }
            return target;
        }
        return null;
    }

    static Uri getFileUri(Context context, String s) {
        Uri uri = Uri.parse(s);
        if (s.startsWith("content://")) {
            // 如果 uri 里存在完整的路径，则提取出来直接使用
            String storageDirectory = Environment.getExternalStorageDirectory().toString();
            int index = s.indexOf(storageDirectory);
            if (index != -1) {
                String path = s.substring(index);
                return Uri.parse("file://" + path);
            }

            String[] types = {MediaStore.MediaColumns.DATA, MediaStore.MediaColumns.DISPLAY_NAME};
            Cursor cursor = context.getContentResolver().query(uri, types, null, null, null);
            if (cursor != null) {
                cursor.moveToFirst();
                int pathIndex = cursor.getColumnIndex(types[0]);
                String path = null;
                if (pathIndex != -1) {
                    path = cursor.getString(pathIndex);
                }
                int fileNameIndex = cursor.getColumnIndex(types[1]);
                String filename = cursor.getString(fileNameIndex);
                cursor.close();
                if (path == null) {
                    path = Utils.getPathFromUri(context, uri, filename);
                }
                return Uri.parse("file://" + path);
            }
        }
        return uri;
    }
}

